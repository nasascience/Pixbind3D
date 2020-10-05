namespace BBWT.Data.Dictionary
{
    /// <summary>
    /// Base for all dictionary classes which store key-value pairs
    /// </summary>
    public abstract class BasicDictionary : Entity
    {
        /// <summary>
        /// Value
        /// </summary>
        public string Name { get; set; }
    }
}
