namespace BBWT.Services.Messages
{
    /// <summary>
    /// Message Severty
    /// </summary>
    public enum Severity
    {
        /// <summary>
        /// Multiple users not able to access the system and perform normal work.
        /// </summary>
        SystemFailure = 0,

        /// <summary>
        /// The system is still considered operational with some functionality disabled.
        /// </summary>
        SystemMalfunction = 1,

        /// <summary>
        /// System operation is impaired, slow running or prints not being produced. Core functionality is operational.
        /// </summary>
        OperationImpaired = 2,

        /// <summary>
        /// System operates normally but incorrect data items or an individual user not able to access the system etc.
        /// </summary>
        DataIssue = 3,

        /// <summary>
        /// Cosmetic error, e.g. spelling screen layout, non-critical drop down selected. User enhancement request.
        /// </summary>
        CosmeticIssue = 4
    }
}
