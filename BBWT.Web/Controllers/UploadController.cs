namespace BBWT.Web.Controllers
{
    using System.Collections.Generic;
    using System.IO;
    using System.Web;
    using System.Web.Mvc;

    /// <summary>
    /// Upload control demo - server-side controller
    /// </summary>
    public class UploadController : Controller
    {
        public static string VideoImageName;
        /// <summary>
        /// Save files received from server
        /// </summary>
        /// <param name="files">Posted files content</param>
        /// <returns>Always returns empty string</returns>
        public ActionResult Save(IEnumerable<HttpPostedFileBase> files)
        {
            
            // The Name of the Upload component is "files"
            if (files != null)
            {
                foreach (var file in files)
                {
                    // Some browsers send file names with full path.
                    // We are only interested in the file name.
                    var fileName = Path.GetFileName(file.FileName);
                    var physicalPath = Path.Combine(Server.MapPath("~/Content/images/Uploads"), fileName);

                    // The files are not actually saved in this demo
                     file.SaveAs(physicalPath);

                     VideoImageName = fileName;
                }
            }

            // Return an empty string to signify success
            return this.Content(string.Empty);
        }

        /// <summary>
        /// Remove files
        /// </summary>
        /// <param name="fileNames">List of files to remove</param>
        /// <returns>Always returns empty string</returns>
        public ActionResult Remove(string[] fileNames)
        {
            //// The parameter of the Remove action must be called "fileNames"

            if (fileNames != null)
            {
                foreach (var fullName in fileNames)
                {
                    var fileName = Path.GetFileName(fullName);
                    var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

                    //// TODO: Verify user permissions

                    if (System.IO.File.Exists(physicalPath))
                    {
                        // The files are not actually removed in this demo
                        // System.IO.File.Delete(physicalPath);
                    }
                }
            }

            // Return an empty string to signify success
            return this.Content(string.Empty);
        }
    }
}