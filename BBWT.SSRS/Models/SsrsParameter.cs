namespace BBWT.SSRS.Models
{
    using System.Collections.Generic;

    /// <summary>
    /// Ssrs parameter class
    /// </summary>
    public class SsrsParameter
    {
        /// <summary>
        /// Constructor
        /// </summary>
        public SsrsParameter()
        {
            this.ValidValues = new List<SsrsParameterValues>();
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
        public List<SsrsParameterValues> ValidValues { get; set; }

        /// <summary>
        /// Value
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// Has predefined values
        /// </summary>
        public bool HasPredefinedValues
        {
            get { return this.ValidValues != null && this.ValidValues.Count > 0; }
        }

        /// <summary>
        /// Is hidden parameter
        /// </summary>
        public bool IsHidden { get; set; }
    }
}
