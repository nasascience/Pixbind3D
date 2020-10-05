namespace BBWT.DTO
{
    /// <summary>
    /// Data Transfer object for CheckBox Item
    /// </summary>
    public class CheckBoxItemDTO
    {
        /// <summary>
        /// Item ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Is item checked?
        /// </summary>
        public bool IsChecked { get; set; }

        /// <summary>
        /// Parameter value
        /// </summary>
        public string Param { get; set; }
    }
}