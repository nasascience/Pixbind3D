using System.Diagnostics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

using System.IO;
using System.Web.Mvc;
using BBWT.Web.Upload;
using BBWT.DTO.Demo;

namespace BBWT.Web.WebAPI
{
    public class UploadsController : ApiController
    {
        public static string VideoImageName;

        //public void OptionalUpload(string path)
        //{
        //    HttpContext context = null;
        //    try
        //    {
        //        path = path.Replace(@"%", "\\");
        //        FileInfo fn = new FileInfo(path);
        //        fn.CopyTo(context.Server.MapPath("~/Content/images/Uploads" + fn.Name));
        //        //context.Response.ContentType = "text/plain";
        //        context.Response.Write(fn.Name);
        //    }
        //    catch
        //    {
        //        context.Response.Write("Error");
        //    }
        //}
        //public Task<IEnumerable<FileDesc>> Post()
        //{
        //    var folderName = "Content/images/Uploads";
        //    var PATH = HttpContext.Current.Server.MapPath("~/" + folderName);
        //    var rootUrl = Request.RequestUri.AbsoluteUri.Replace(Request.RequestUri.AbsolutePath, String.Empty);
        //    if (Request.Content.IsMimeMultipartContent())
        //    {
        //        var streamProvider = new CustomMultipartFormDataStreamProvider(PATH);
        //        var task = Request.Content.ReadAsMultipartAsync(streamProvider).ContinueWith<IEnumerable<FileDesc>>(t =>
        //        {

        //            if (t.IsFaulted || t.IsCanceled)
        //            {
        //                throw new HttpResponseException(HttpStatusCode.InternalServerError);
        //            }

        //            var fileInfo = streamProvider.FileData.Select(i =>
        //            {
        //                var info = new FileInfo(i.LocalFileName);
        //                return new FileDesc(info.Name, rootUrl + "/" + folderName + "/" + info.Name, info.Length / 1024);
        //            });
        //            return fileInfo;
        //        });

        //        return task;
        //    }
        //    else
        //    {
        //        throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotAcceptable, "This request is not properly formatted"));
        //    }
        //}


        public async Task<HttpResponseMessage> PostFormData()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/Content/images/Uploads");
            var provider = new CustomMultipartFormDataStreamProvider(root);

            try
            {
                // Read the form data.
                await Request.Content.ReadAsMultipartAsync(provider);

                // This illustrates how to get the file names.
                foreach (MultipartFileData file in provider.FileData)
                {
                    Trace.WriteLine(file.Headers.ContentDisposition.FileName);
                    Trace.WriteLine("Server file path: " + file.LocalFileName);
                    VideoImageName = file.Headers.ContentDisposition.FileName;
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

    }
}
