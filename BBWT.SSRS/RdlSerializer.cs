namespace BBWT.SSRS
{
    using System;
    using System.IO;
    using System.Reflection;
    using System.Xml;
    using Microsoft.ReportingServices.RdlObjectModel;

    /// <summary>
    /// Class that implements serialization of RdlObjectModel
    /// </summary>
    public class RdlSerializer
    {
        private Type internalType;
        private object typeInstance;
        private MethodInfo deserializeStreamToReportMethod;
        private MethodInfo deserializeTextReaderToReportMethod;
        private MethodInfo deserializeXmlReaderToReportMethod;
        private MethodInfo deserializeStreamToObjectMethod;
        private MethodInfo deserializeTextReaderToObjectMethod;
        private MethodInfo deserializeXmlReaderToObjectMethod;
        private MethodInfo serializeToStreamMethod;
        private MethodInfo serializeToTextWriterMethod;
        private MethodInfo serializeToXmlWriterMethod;

        /// <summary>
        /// Constructor
        /// </summary>
        public RdlSerializer()
        {
            Assembly assembly = Assembly.GetAssembly(typeof(Report));

            this.typeInstance =
                assembly.CreateInstance("Microsoft.ReportingServices.RdlObjectModel.Serialization.RdlSerializer");
            this.internalType = this.typeInstance.GetType();
        }

        /// <summary>
        /// Deserealizes RDL stream
        /// </summary>
        /// <param name="stream">Input stream that contains RDL</param>
        /// <returns>Microsoft.ReportingServices.RdlObjectModel</returns>
        public Report Deserialize(Stream stream)
        {
            if (this.deserializeStreamToReportMethod == null)
            {
                Type[] methodSignature = new Type[] { typeof(Stream) };

                this.deserializeStreamToReportMethod = this.internalType.GetMethod("Deserialize", methodSignature);
            }

            object[] methodParameters = new object[] { stream };

            return (Report)this.deserializeStreamToReportMethod.Invoke(this.typeInstance, methodParameters);
        }

        /// <summary>
        /// Deserealizes TextReader that contains RDL
        /// </summary>
        /// <param name="textReader">Input TextReader that contains RDL</param>
        /// <returns>Microsoft.ReportingServices.RdlObjectModel</returns>
        public Report Deserialize(TextReader textReader)
        {
            if (this.deserializeTextReaderToReportMethod == null)
            {
                Type[] methodSignature = new Type[] { typeof(TextReader) };

                this.deserializeTextReaderToReportMethod = this.internalType.GetMethod("Deserialize", methodSignature);
            }

            object[] methodParameters = new object[] { textReader };

            return (Report)this.deserializeTextReaderToReportMethod.Invoke(this.typeInstance, methodParameters);
        }

        /// <summary>
        /// Deserealizes XmlReader that contains RDL
        /// </summary>
        /// <param name="xmlReader">Input XmlReader that contains RDL</param>
        /// <returns>Microsoft.ReportingServices.RdlObjectModel</returns>
        public Report Deserialize(XmlReader xmlReader)
        {
            if (this.deserializeXmlReaderToReportMethod == null)
            {
                Type[] methodSignature = new Type[] { typeof(XmlReader) };

                this.deserializeXmlReaderToReportMethod = this.internalType.GetMethod("Deserialize", methodSignature);
            }

            object[] methodParameters = new object[] { xmlReader };

            return (Report)this.deserializeXmlReaderToReportMethod.Invoke(this.typeInstance, methodParameters);
        }

        /// <summary>
        /// Deserealizes RDL stream to specified objectType
        /// </summary>
        /// <param name="stream">Input Stream that contains RDL</param>
        /// <param name="objectType">Object Type to deserializaition</param>
        /// <returns>Object</returns>
        public object Deserialize(Stream stream, Type objectType)
        {
            if (this.deserializeStreamToObjectMethod == null)
            {
                Type[] methodSignature = new Type[] { typeof(Stream), typeof(Type) };

                this.deserializeStreamToObjectMethod = this.internalType.GetMethod("Deserialize", methodSignature);
            }

            object[] methodParameters = new object[] { stream, objectType };

            return this.deserializeStreamToObjectMethod.Invoke(this.typeInstance, methodParameters);
        }

        /// <summary>
        /// Deserealizes RDL TextReader to specified objectType
        /// </summary>
        /// <param name="textReader">Input TextReader that contains RDL</param>
        /// <param name="objectType">Object Type to deserializaition</param>
        /// <returns>Object</returns>
        public object Deserialize(TextReader textReader, Type objectType)
        {
            if (this.deserializeTextReaderToObjectMethod == null)
            {
                Type[] methodSignature = new Type[] { typeof(TextReader), typeof(Type) };

                this.deserializeTextReaderToObjectMethod = this.internalType.GetMethod("Deserialize", methodSignature);
            }

            object[] methodParameters = new object[] { textReader, objectType };

            return this.deserializeTextReaderToObjectMethod.Invoke(this.typeInstance, methodParameters);
        }

        /// <summary>
        /// Deserealizes RDL XmlReader to specified objectType
        /// </summary>
        /// <param name="xmlReader">Input XmlReader that contains RDL</param>
        /// <param name="objectType">Object Type to deserializaition</param>
        /// <returns>Object</returns>
        public object Deserialize(XmlReader xmlReader, Type objectType)
        {
            if (this.deserializeXmlReaderToObjectMethod == null)
            {
                Type[] methodSignature = new Type[] { typeof(XmlReader), typeof(Type) };

                this.deserializeXmlReaderToObjectMethod = this.internalType.GetMethod("Deserialize", methodSignature);
            }

            object[] methodParameters = new object[] { xmlReader, objectType };

            return this.deserializeXmlReaderToObjectMethod.Invoke(this.typeInstance, methodParameters);
        }

        /// <summary>
        /// Serializes RDL object to Stream
        /// </summary>
        /// <param name="stream">Output Stream</param>
        /// <param name="o">Input RDLObject</param>
        public void Serialize(Stream stream, object o)
        {
            if (this.serializeToStreamMethod == null)
            {
                Type[] methodSignature = new Type[] { typeof(Stream), typeof(object) };

                this.serializeToStreamMethod = this.internalType.GetMethod("Serialize", methodSignature);
            }

            object[] methodParameters = new object[] { stream, o };

            this.serializeToStreamMethod.Invoke(this.typeInstance, methodParameters);
        }

        /// <summary>
        /// Serializes RDL object to TextWriter
        /// </summary>
        /// <param name="textWriter">Output TextWriter</param>
        /// <param name="o">Input RDLObject</param>
        public void Serialize(TextWriter textWriter, object o)
        {
            if (this.serializeToTextWriterMethod == null)
            {
                Type[] methodSignature = new Type[] { typeof(TextWriter), typeof(object) };

                this.serializeToTextWriterMethod = this.internalType.GetMethod("Serialize", methodSignature);
            }

            object[] methodParameters = new object[] { textWriter, o };

            this.serializeToTextWriterMethod.Invoke(this.typeInstance, methodParameters);
        }

        /// <summary>
        /// Serializes RDL object to XmlWriter
        /// </summary>
        /// <param name="xmlWriter">Output XmlWriter</param>
        /// <param name="o">Input RDLObject</param>
        public void Serialize(XmlWriter xmlWriter, object o)
        {
            if (this.serializeToXmlWriterMethod == null)
            {
                Type[] methodSignature = new Type[] { typeof(XmlWriter), typeof(object) };

                this.serializeToXmlWriterMethod = this.internalType.GetMethod("Serialize", methodSignature);
            }

            object[] methodParameters = new object[] { xmlWriter, o };

            this.serializeToXmlWriterMethod.Invoke(this.typeInstance, methodParameters);
        }
    }
}
