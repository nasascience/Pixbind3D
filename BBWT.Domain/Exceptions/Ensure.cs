namespace BBWT.Domain.Exceptions
{
    using System;

    /// <summary>
    /// Provides methods that helps checking for data integrity in runtime
    /// </summary>
    public static class Ensure
    {
        /// <summary>
        /// Checks if string is null or empty
        /// </summary>
        /// <param name="s">
        /// The string
        /// </param>
        /// <param name="message">
        /// Message to be thrown if the string is empty.
        /// </param>
        public static void ArgumentNotNullOrEmpty(string s, string message)
        {
            if (string.IsNullOrEmpty(s))
            {
                throw new InvalidOperationException(message);
            }
        }

        /// <summary>
        /// Checks if a value is true
        /// </summary>
        /// <param name="val">
        /// The value to check
        /// </param>
        /// <param name="message">
        /// Message to be thrown if the string is empty.
        /// </param>
        public static void IsTrue(bool val, string message)
        {
            if (!val)
            {
                throw new InvalidOperationException(message);
            }
        }
    }
}