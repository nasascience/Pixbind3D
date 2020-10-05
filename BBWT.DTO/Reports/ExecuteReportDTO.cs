namespace BBWT.DTO.Reports
{
    using System.Collections.Generic;

    /// <summary>
    /// Execute report POST object
    /// </summary>
   public class ExecuteReportDTO
    {
       /// <summary>
       /// Path
       /// </summary>
       public string Path { get; set; }

       /// <summary>
       /// Format
       /// </summary>
       public string Format { get; set; }

       /// <summary>
       /// Parameters
       /// </summary>
       public List<ParameterDTO> Parameters { get; set; }
    }
}
