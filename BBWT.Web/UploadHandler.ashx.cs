using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace BBWT.Web
{
    /// <summary>
    /// Summary description for UploadHandler
    /// </summary>
    public class UploadHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                string path = context.Request["path"];
                FileInfo fn = new FileInfo(path);
                fn.CopyTo(context.Server.MapPath("~/Content/images/Uploads" + fn.Name));
                //context.Response.ContentType = "text/plain";
                context.Response.Write(fn.Name);
            }
            catch
            {
                context.Response.Write("Error");
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}