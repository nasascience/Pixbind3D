namespace BBWT.Services.Classes
{
    using System;
    using System.Diagnostics;
    using System.IO;

    using BBWT.Services.Interfaces;

    /// <summary>
    /// The PhantomJS service class
    /// </summary>
    public class PhantomService : IPhantomService
    {
        private string html = string.Empty;

        /// <summary>
        /// The PhantomJS service class constructor
        /// </summary>
        public PhantomService()
        {
        }

        /// <summary>
        /// The GetWebPage
        /// </summary>
        /// <param name="url">The string of Url</param>
        /// <param name="escapedFragment">The string of escaped fragment in Url</param>
        /// <param name="applicationPath">The string of physical application path</param>
        /// <returns>The string with html of requested page</returns>
        public string GetWebPage(Uri url, string escapedFragment, string applicationPath)
        {
            string phantomUrl = url.OriginalString.Replace(url.Query, string.Empty);

            if (!phantomUrl.EndsWith(@"/"))
            {
                phantomUrl += @"/";
            }

            phantomUrl += "#!";

            if (!escapedFragment.StartsWith(@"/"))
            {
                phantomUrl += @"/";
            }

            phantomUrl += escapedFragment;

            string workingDirectory = Path.Combine(applicationPath, "bin");

            string error = string.Empty;

            using (Process phantomjsProcess = new Process())
            {
                phantomjsProcess.StartInfo = new ProcessStartInfo(Path.Combine(workingDirectory, "phantomjs.exe"))
                {
                    Arguments = @"--disk-cache=false --local-to-remote-url-access=false " + Path.Combine(workingDirectory, "Phantom.js") + " " + phantomUrl,
                    CreateNoWindow = false,
                    LoadUserProfile = false,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    WorkingDirectory = workingDirectory
                };

                this.html = string.Empty;
                phantomjsProcess.OutputDataReceived += this.PhantomjsProcess_OutputDataReceived;
                if (phantomjsProcess.Start())
                {
                    phantomjsProcess.BeginOutputReadLine();
                    phantomjsProcess.WaitForExit(60 * 1000);
                    if (!phantomjsProcess.HasExited)
                    {
                        phantomjsProcess.Kill();
                        phantomjsProcess.WaitForExit();
                    }

                    phantomjsProcess.Close();
                }
            }

            return this.html;
        }

        private void PhantomjsProcess_OutputDataReceived(object sender, DataReceivedEventArgs e)
        {
            this.html += e.Data;
        }
    }
}
