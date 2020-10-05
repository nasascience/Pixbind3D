namespace BBWT.Web.WebAPI
{
    using System;
    using System.Collections.Generic;
    using System.Collections.Specialized;
    using System.Linq;
    using System.Net.Mail;
    using System.Web.Http;

    using AutoMapper;
    using AutoMapper.QueryableExtensions;

    using BBWT.Data.Membership;
    using BBWT.DTO;
    using BBWT.DTO.Membership;
    using BBWT.Services.Interfaces;
    using BBWT.Services.Messages;
    using System.Net.Mail;
    using WebMatrix.WebData;
    using System.Text;

    /// <summary>
    /// User management API controller
    /// </summary>
    public class UsersController : ApiController
    {
        private readonly IMembershipService service;

        private readonly ISecurityService securityService;

        private readonly IMappingEngine mapper;

        private readonly IEmailSender sender;

        /// <summary>Constructs users controller</summary>
        /// <param name="srv">membership service injection</param>
        /// <param name="srvS">security service injection</param>
        /// <param name="mapper">Mapper instance</param>
        /// <param name="sender">Email sender</param>
        public UsersController(IMembershipService srv, ISecurityService srvS, IMappingEngine mapper, IEmailSender sender)
        {
            this.service = srv;
            this.securityService = srvS;
            this.mapper = mapper;
            this.sender = sender;
        }

        /// <summary>Delete user</summary>
        /// <param name="id">User ID</param>
        [HttpGet]
        public void DeleteUser(int id)
        {
            this.service.DeleteUser(id);
        }

        /// <summary>
        /// Get user settings
        /// </summary>
        /// <param name="id">User Id</param>
        /// <returns>user settings</returns>
        [HttpGet]
        public UserSettingsDto GetUserSettings(int id)
        {
            var settings = this.service.GetUserSettings(id);
            return this.mapper.Map<UserSettingsDto>(settings);
        }

        /// <summary>Get list of users</summary>
        /// <returns>List of users</returns>
        public IQueryable<AccountDTO> GetAllUsers()
        {
            return this.service.GetAllUsers().Project().To<AccountDTO>();
        }

        /// <summary>Get user by id</summary>
        /// <param name="id">User ID</param>
        /// <returns>Users DTO</returns>
        public UserDTO GetUserById(int id)
        {
            var user = id == 0
                           ? new User
                                 {
                                     Name = string.Empty,
                                     Groups = new List<Group>(),
                                     Roles = new List<Role>(),
                                     Permissions = new List<AssignedPermission>()
                                 }
                           : this.service.GetUserById(id);
            var userDTO = this.mapper.Map<UserDTO>(user);

            var permissionsDTO = this.service.GetAllPermissions().Project().To<CheckBoxItemDTO>().ToList();
            permissionsDTO.ForEach(it =>
                {
                    var perm = user.Permissions.FirstOrDefault(p => p.LinkedPermission.Id == it.Id);
                    if (perm != null)
                    {
                        it.IsChecked = true;
                        it.Param = perm.ParameterValue;
                    }
                    else
                    {
                        it.IsChecked = false;
                        it.Param = null;
                    }
                });

            var groupsDTO = this.service.GetAllGroups().Project().To<CheckBoxItemDTO>().ToList();
            groupsDTO.ForEach(it => it.IsChecked = user.Groups.Any(p => p.Id == it.Id));

            var rolesDTO = this.service.GetAllRoles().Project().To<CheckBoxItemDTO>().ToList();
            rolesDTO.ForEach(it => it.IsChecked = user.Roles.Any(p => p.Id == it.Id));

            userDTO.Permissions = permissionsDTO;
            userDTO.Roles = rolesDTO;
            userDTO.Groups = groupsDTO;
            return userDTO;
        }

        /// <summary>Register new user</summary>
        /// <param name="dto">Data transfer object</param>
        public bool RegisterUser(RegisterUserDTO dto)
        {
            var Status = false;
            var user = this.mapper.Map<User>(dto);

            // TODO: @Elijah change this to default language
            user.UserSettings = new UserSettings { LanguageId = 1 };

            try
            {
                this.service.CreateUser(user, dto.Pass);
                this.SendNotification(user);
                Status = true;
            }
            catch {
                Status = false;
            }


            return Status;
        }

        /// <summary>Get user for ticket</summary>
        /// <param name="id">encoded ticket</param>
        /// <returns>user dto</returns>
        [HttpGet]
        public UserDTO GetUserByTicket(string id)
        {
            var ticket = this.securityService.DecodeTicket(id);

            Guid ticketGuid;
            if (!Guid.TryParse(ticket, out ticketGuid))
            {
                throw new ArgumentException("Ticket is not a valid Guid", "ticket");
            }

            var user = this.securityService.GetUserByTicket(ticket);
            return user != null ? this.mapper.Map<UserDTO>(user) : null;
        }

        /// <summary>Reset ticket and change user password</summary>
        /// <param name="dto">ticket with new userpassword</param>
        /// <returns>return true if success</returns>                
        public bool ResetRegisterTicket(ResetRegisterTicketDTO dto)
        {
            bool result = false;
            var decodedTicket = this.securityService.DecodeTicket(dto.Ticket);

            Guid ticketGuid;
            if (!Guid.TryParse(decodedTicket, out ticketGuid))
            {
                throw new ArgumentException("Ticket is not a valid Guid", "ticket");
            }

            var user = this.securityService.GetUserByTicket(decodedTicket);
            if (user != null)
            {
                //// reset ticket
                this.securityService.MarkUserTicketAsUsed(decodedTicket);

                //// change password
                var token = WebSecurity.GeneratePasswordResetToken(user.Name);
                result = WebSecurity.ResetPassword(token, dto.User.Password);
            }
            else
            {
                throw new ArgumentException("Ticket is not found for this user", "ticket");
            }

            return result;
        }

        /// <summary>Save user</summary>
        /// <param name="dto">User DTO</param>
        public void SaveUser(UserDTO dto)
        {
            // create user
            if (dto.Id == 0)
            {
                var user = this.mapper.Map<User>(dto);
                user.Groups = new List<Group>();
                user.Roles = new List<Role>();
                user.Permissions = new List<AssignedPermission>();

                this.UpdateGroupsCollection(user.Groups, dto.Groups);
                this.UpdateRolesCollection(user.Roles, dto.Roles);
                this.UpdatePermissionsCollection(user.Permissions, dto.Permissions);

                //// create temp password for user
                if (dto.IsEmailUserToRegister)
                {
                    dto.Password = Guid.NewGuid().ToString().Replace("-", string.Empty).Substring(10);
                }

                this.service.CreateUser(user, dto.Password);

                //// send notification with userlink
                if (dto.IsEmailUserToRegister)
                {
                    var url = this.CalcUrl("userregistration");

                    var ticket = this.securityService.CreateTicketForUser(user);
                    if (ticket != null)
                    {
                        var link = this.securityService.EncodeTicket(url, new Guid(ticket));
                        this.SendNotification(user, link);
                    }
                }
            }
            else
            {
                //// update user
                this.service.UpdateUser(
                    dto.Id,
                    user =>
                    {
                        this.mapper.Map(dto, user);

                        this.UpdateGroupsCollection(user.Groups, dto.Groups);
                        this.UpdateRolesCollection(user.Roles, dto.Roles);
                        this.UpdatePermissionsCollection(user.Permissions, dto.Permissions);
                    });
            }
        }

        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="dto">User DTO</param>
        public void UpdateUser(UpdateUserDTO dto)
        {
            this.service.UpdateUser(dto.Id, user => this.mapper.Map(dto, user));
        }

        /// <summary>
        /// Get current loggined user id
        /// </summary>
        /// <returns>Current user id</returns>
        public int GetCurrentUserId()
        {
            return this.service.GetCurrentUserId();
        }

        /// <summary>
        /// The change password
        /// </summary>
        /// <param name="dto">The change password DTO</param>
        public void ChangePassword(ChangePasswordDto dto)
        {
            if (string.IsNullOrEmpty(dto.CurrentPassword) || string.IsNullOrEmpty(dto.NewPassword))
            {
                throw new InvalidOperationException("Current password or New password is null");
            }

            bool success = WebSecurity.ChangePassword(dto.Name, dto.CurrentPassword, dto.NewPassword);
            if (!success)
            {
                throw new InvalidOperationException("Current password is wrong. Please try again!");
            }
        }

        /// <summary>
        /// Recover password
        /// </summary>
        /// <param name="dto">The change password DTO</param>
        public void RecoverPassword(RecoverPasswordDTO dto)
        {
            this.SendPasswordResetImpl(dto);
        }        

        /// <summary>
        /// Send password resed
        /// </summary>
        /// <param name="dto">Recover password DTO</param>
        public void SendPasswordResetByAdmin(RecoverPasswordDTO dto)
        {
            this.SendPasswordResetImpl(dto, "ResetPasswordByAdmin");
        }

        private void SendPasswordResetImpl(RecoverPasswordDTO dto, string templateCode = "ResetPassword")
        {
            var user = this.service.GetUserByName(dto.Email);
            if (user == null)
            {
                throw new InvalidOperationException("User with such email isn't registered");
            }

            var ticket = this.securityService.CreateTicketForUser(user);
            if (ticket != null)
            {
                var url = this.CalcUrl("resetpassword");
                var link = this.securityService.EncodeTicket(url, new Guid(ticket));
                this.SendResetPasswordNotification(user, link, templateCode);


                //Gmail server
                /*SmtpClient client = new SmtpClient();
                client.Port = 587;
                client.Host = "smtp.live.com";
                client.EnableSsl = true;
                client.Timeout = 10000;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new System.Net.NetworkCredential("nasa.x.science@gmail.com", "prognasa");

                MailMessage mm = new MailMessage("nasa.x.science@gmail.com", dto.Email, "ResetPassword", "link");
                mm.BodyEncoding = UTF8Encoding.UTF8;
                mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

                client.Send(mm);*/
                SmtpClient SmtpServer = new SmtpClient("smtp.live.com");
                var mail = new MailMessage();
                mail.From = new MailAddress("cashout@live.com");
                mail.To.Add(dto.Email);
                mail.Subject = "ResetPassword";
                mail.IsBodyHtml = true;
                string htmlBody;
                htmlBody = "<a href='" + link + "'>Click here to reset your password</a>"; // "Write some HTML code here";
                //htmlBody = link; 
                mail.Body = htmlBody;
                SmtpServer.Port = 587;
                SmtpServer.UseDefaultCredentials = false;
                SmtpServer.Credentials = new System.Net.NetworkCredential("cashout@live.com", "Prognasa12");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
            }
        }

        private void UpdateGroupsCollection(ICollection<Group> groups, IList<CheckBoxItemDTO> dtos)
        {
            if (groups == null || dtos == null)
            {
                return;
            }

            foreach (var group in dtos)
            {
                var item = groups.FirstOrDefault(p => p.Id == group.Id);

                if (group.IsChecked)
                {
                    if (item == null)
                    {
                        groups.Add(this.service.GetGroupById(group.Id));
                    }
                }
                else
                {
                    if (item != null)
                    {
                        groups.Remove(item);
                    }
                }
            }
        }

        private void UpdatePermissionsCollection(ICollection<AssignedPermission> permissions, IList<CheckBoxItemDTO> dtos)
        {
            if (permissions == null || dtos == null)
            {
                return;
            }

            foreach (var perm in dtos)
            {
                var item = permissions.FirstOrDefault(p => p.LinkedPermission.Id == perm.Id);

                if (perm.IsChecked)
                {
                    if (item == null)
                    {
                        permissions.Add(
                            new AssignedPermission
                                {
                                    LinkedPermission = this.service.GetPermissionById(perm.Id),
                                    ParameterValue = perm.Param
                                });
                    }
                    else
                    {
                        item.ParameterValue = perm.Param;
                    }
                }
                else
                {
                    if (item != null)
                    {
                        permissions.Remove(item);
                        item.LinkedPermission = null;
                    }
                }
            }
        }

        private void UpdateRolesCollection(ICollection<Role> roles, IList<CheckBoxItemDTO> dtos)
        {
            if (roles == null || dtos == null)
            {
                return;
            }

            foreach (var role in dtos)
            {
                var item = roles.FirstOrDefault(p => p.Id == role.Id);

                if (role.IsChecked)
                {
                    if (item == null)
                    {
                        roles.Add(this.service.GetRoleById(role.Id));
                    }
                }
                else
                {
                    if (item != null)
                    {
                        roles.Remove(item);
                    }
                }
            }
        }

        private void SendNotification(User user, string userLink = "")
        {
            var tagValues = new NameValueCollection
                                {
                                    { "$UserName", string.Format("{0} {1}", user.FirstName, user.Surname) },
                                    { "$UserFirstName", user.FirstName },
                                    { "$UserSurname", user.Surname },
                                    { "$UserEmail", user.Name },
                                    { "$UserLink", userLink }
                                };

            var address = new MailAddress(user.Name, string.Format("{0} {1}", user.FirstName, user.Surname));
            this.sender.SendEmail("UserCreated", tagValues, new MailAddressCollection { address }, null);
        }

        private void SendResetPasswordNotification(User user, string userLink, string templateCode)
        {
            var tagValues = new NameValueCollection
                                {
                                    { "$UserName", string.Format("{0} {1}", user.FirstName, user.Surname) },
                                    { "$UserFirstName", user.FirstName },
                                    { "$UserSurname", user.Surname },
                                    { "$UserEmail", user.Name },
                                    { "$UserLink", userLink }
                                };

            var address = new MailAddress(user.Name, string.Format("{0} {1}", user.FirstName, user.Surname));
            this.sender.SendEmail(templateCode, tagValues, new MailAddressCollection { address }, null);
        }

        private string CalcUrl(string tail)
        {
            var url = Request.RequestUri.Scheme + System.Uri.SchemeDelimiter + Request.RequestUri.Host +
                      (Request.RequestUri.IsDefaultPort ? string.Empty : ":" + Request.RequestUri.Port) + "/#/" + tail;
            return url;
        }
    }
}