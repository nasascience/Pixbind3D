﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.18449
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BBWT.Domain {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "4.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public class Notifications {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Notifications() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("BBWT.Domain.Notifications", typeof(Notifications).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to &lt;div style=&apos;font-size: 10.0pt; font-family:Calibri,sans-serif;&apos;&gt;
        ///  &lt;div&gt;Legend:&lt;/div&gt;
        ///  &lt;div&gt;
        ///    &lt;table&gt;
        ///      &lt;tr&gt;
        ///        &lt;td&gt;$AppName&lt;/td&gt;
        ///        &lt;td&gt;The name of web application&lt;/td&gt;
        ///      &lt;/tr&gt;
        ///      &lt;tr&gt;
        ///        &lt;td&gt;$DateTime&lt;/td&gt;
        ///        &lt;td&gt;The current date &amp; time&lt;/td&gt;
        ///      &lt;/tr&gt;
        ///      &lt;tr&gt;
        ///        &lt;td&gt;$UserName&lt;/td&gt;
        ///        &lt;td&gt;User name (login)&lt;/td&gt;
        ///      &lt;/tr&gt;
        ///      &lt;tr&gt;
        ///        &lt;td&gt;$UserEmail&lt;/td&gt;
        ///        &lt;td&gt;User email address&lt;/td&gt;
        ///      &lt;/tr&gt;
        ///    &lt;/table&gt;
        ///  &lt;/div&gt;
        ///&lt;/div [rest of string was truncated]&quot;;.
        /// </summary>
        public static string BaseTemplateLegend {
            get {
                return ResourceManager.GetString("BaseTemplateLegend", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to support@bbconsult.co.uk.
        /// </summary>
        public static string NewUserNotificationFrom {
            get {
                return ResourceManager.GetString("NewUserNotificationFrom", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to &lt;div style=&apos;font-size: 10.0pt; font-family:Calibri,sans-serif;&apos;&gt;
        ///  &lt;span&gt;Hello #$UserName#&lt;/span&gt;&lt;br /&gt;
        ///  &lt;br /&gt;
        ///  &lt;span&gt;We would like to welcome you to #$AppName#.&lt;/span&gt;&lt;br /&gt;
        ///  &lt;span&gt;Please go to &lt;a href=&apos;#$UserLink#&apos;&gt;your account page&lt;/a&gt; and enter the requested information.&lt;/span&gt;&lt;br /&gt;
        ///  &lt;span&gt;We&apos;re happy to have you with us at #$AppName#.&lt;/span&gt;&lt;br /&gt;
        ///  &lt;br /&gt;
        ///  &lt;span&gt;Best regards, #$AppName# team.&lt;/span&gt;
        ///&lt;/div&gt;.
        /// </summary>
        public static string NewUserNotificationMessage {
            get {
                return ResourceManager.GetString("NewUserNotificationMessage", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to .
        /// </summary>
        public static string NewUserNotificationNotes {
            get {
                return ResourceManager.GetString("NewUserNotificationNotes", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Welcome to #$AppName#.
        /// </summary>
        public static string NewUserNotificationSubject {
            get {
                return ResourceManager.GetString("NewUserNotificationSubject", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to &lt;&quot;#$ProblemUserName#&quot;&gt; #$ProblemUserEmail#.
        /// </summary>
        public static string ProblemNotificationFrom {
            get {
                return ResourceManager.GetString("ProblemNotificationFrom", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to &lt;div style=&apos;font-size: 10.0pt; font-family:Calibri,sans-serif;&apos;&gt;
        ///  &lt;span&gt; Report a Problem: &lt;/span&gt;&lt;span style=&apos;color: Red;&apos;&gt; &amp;nbsp;#$DateTime# &lt;/span&gt;
        ///  &lt;br/&gt;
        ///  &lt;span style=&apos;color: Red;&apos;&gt; User: &lt;/span&gt;&lt;span style=&apos;color: Red;&apos;&gt; &amp;nbsp;#$ProblemUserName# &lt;/span&gt;
        ///  &lt;br/&gt;
        ///  &lt;span&gt; User Email: &lt;/span&gt;&lt;span&gt; &amp;nbsp;#$ProblemUserEmail# &lt;/span&gt;
        ///  &lt;br/&gt;
        ///  &lt;span style=&apos;color: Red;&apos;&gt;Time of Problem: &lt;/span&gt;&lt;span style=&apos;color: Red;&apos;&gt; &amp;nbsp;#$ProblemDateTime# &lt;/span&gt;
        ///  &lt;br/&gt;
        ///  &lt;br/&gt;
        ///  &lt;span&gt; Problem Descriptio [rest of string was truncated]&quot;;.
        /// </summary>
        public static string ProblemNotificationMessage {
            get {
                return ResourceManager.GetString("ProblemNotificationMessage", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to .
        /// </summary>
        public static string ProblemNotificationNotes {
            get {
                return ResourceManager.GetString("ProblemNotificationNotes", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Report a problem: #$DateTime#.
        /// </summary>
        public static string ProblemNotificationSubject {
            get {
                return ResourceManager.GetString("ProblemNotificationSubject", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to &lt;div style=&apos;font-size: 10.0pt; font-family:Calibri,sans-serif;&apos;&gt;&lt;span&gt;Please change your password.&lt;/span&gt;&lt;br /&gt;
        ///  &lt;span&gt;To initiate the password reset process for your #$AppName# Account, click &lt;a href=&apos;#$UserLink#&apos;&gt;here&lt;/a&gt;.&lt;/span&gt;&lt;br /&gt;
        ///  &lt;br /&gt;
        ///  &lt;span&gt;If clicking the link above doesn&apos;t work, please copy and paste the URL in a new browser window instead.&lt;/span&gt;&lt;br /&gt;  
        ///  &lt;span&gt;Thank you for using #$AppName#.&lt;/span&gt;&lt;br /&gt;
        ///  &lt;br /&gt;
        ///  &lt;span&gt;This is a post-only mailing.  Replies to this message are not [rest of string was truncated]&quot;;.
        /// </summary>
        public static string ResetPasswordByAdminNotificationMessage {
            get {
                return ResourceManager.GetString("ResetPasswordByAdminNotificationMessage", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to &lt;div style=&apos;font-size: 10.0pt; font-family:Calibri,sans-serif;&apos;&gt;
        ///  &lt;span&gt;To initiate the password reset process for your #$AppName# Account, click &lt;a href=&apos;#$UserLink#&apos;&gt;here&lt;/a&gt;.&lt;/span&gt;&lt;br /&gt;
        ///  &lt;br /&gt;
        ///  &lt;span&gt;If clicking the link above doesn&apos;t work, please copy and paste the URL in a new browser window instead.&lt;/span&gt;&lt;br /&gt;
        ///  &lt;span&gt;If you&apos;ve received this mail in error, it&apos;s likely that another user entered your email address by mistake while trying to reset a password.
        ///                         If you  [rest of string was truncated]&quot;;.
        /// </summary>
        public static string ResetPasswordNotificationMessage {
            get {
                return ResourceManager.GetString("ResetPasswordNotificationMessage", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Reset password for #$AppName#.
        /// </summary>
        public static string ResetPasswordNotificationSubject {
            get {
                return ResourceManager.GetString("ResetPasswordNotificationSubject", resourceCulture);
            }
        }
    }
}