namespace BBWT.Services.Classes
{
    using BBWT.Services.Interfaces;
    using Microsoft.ReportingServices.RdlObjectModel;

    /// <summary>
    /// Class that implements IParameterDataTypeProvider interface
    /// </summary>
    public class ParameterDataTypeProvider : IParameterDataTypeProvider
    {
        /// <summary>
        /// Returns DataType enum value by specified type code
        /// </summary>
        /// <param name="code">Type code</param>
        /// <returns>DataTypes enum value</returns>
        public DataTypes GetDataTypeEnumValueByCode(int code)
        {
            switch (code)
            {
                case 0:
                    return DataTypes.String;
                case 1:
                    return DataTypes.Integer;
                case 2:
                    return DataTypes.Float;
                case 3:
                    return DataTypes.Boolean;
                case 4:
                    return DataTypes.DateTime;
                default:
                    return DataTypes.String;
            }
        }
    }
}
