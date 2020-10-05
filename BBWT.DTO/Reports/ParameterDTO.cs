namespace BBWT.DTO.Reports
{
    using System.Collections.Generic;

    /// <summary>
    /// Report parameter DTO
    /// </summary>
    public class ParameterDTO
    {
        /// <summary>
        /// Constructor
        /// </summary>
        public ParameterDTO()
        {
            this.Value = string.Empty;
        }

        /// <summary>
        /// Parameter Name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Prompt
        /// </summary>
        public string Prompt { get; set; }

        /// <summary>
        /// Valid values 
        /// </summary>
        public List<ParameterValuesDTO> ValidValues { get; set; }

        /// <summary>
        /// Value
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// Allow null value attribute
        /// </summary>
        public bool AllowNullValue { get; set; }

        /// <summary>
        /// Allow blank value attribute
        /// </summary>
        public bool AllowBlankValue { get; set; }

        /// <summary>
        /// Allow multiple values attribute
        /// </summary>
        public bool AllowMultipleValues { get; set; }

        /// <summary>
        /// Parameter visibility (0 - visible; 1 - hidden; 2 - internal)
        /// </summary>
        public byte Visibility { get; set; }

        /// <summary>
        /// Has predefined values
        /// </summary>
        public bool HasPredefinedValues
        {
            get
            {
                return this.ValidValues != null && this.ValidValues.Count > 0;
            }
        }

        /// <summary>
        /// IsHidden parameter
        /// </summary>
        public bool IsHidden { get; set; }
    }
}
