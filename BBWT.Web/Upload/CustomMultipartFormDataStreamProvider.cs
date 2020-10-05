using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

using System.Web.Http;

using System.IO;
using System.Web.Mvc;

namespace BBWT.Web.Upload
{
public class CustomMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
{
	public CustomMultipartFormDataStreamProvider(string path) : base(path)
	{}

        public override string GetLocalFileName(System.Net.Http.Headers.HttpContentHeaders headers)
        {
            var name = !string.IsNullOrWhiteSpace(headers.ContentDisposition.FileName) ? headers.ContentDisposition.FileName : "NoName";
            return name.Replace("\"", string.Empty); //this is here because Chrome submits files in quotation marks which get treated as part of the filename and get escaped")
        }
}
}