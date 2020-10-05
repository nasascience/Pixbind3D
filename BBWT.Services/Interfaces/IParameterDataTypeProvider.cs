namespace BBWT.Services.Interfaces
{
    using Microsoft.ReportingServices.RdlObjectModel;

    /// <summary>
    /// IParameterDataTypeProvider
    /// </summary>
    public interface IParameterDataTypeProvider
    {
        /// <summary>
        /// Returns DataType enum value by specified type code
        /// </summary>
        /// <param name="code">Type code</param>
        /// <returns>DataTypes enum value</returns>
        DataTypes GetDataTypeEnumValueByCode(int code);
    }
}
