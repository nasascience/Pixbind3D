using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBWT.DTO.Demo
{
    public class ProductDataDTO
    {
        /// <summary>
        /// ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Title
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Type
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// Price
        /// </summary>
        public float Price { get; set; }

        /// <summary>
        /// Purchased
        /// </summary>
        public float? Purchased { get; set; }

        /// <summary>
        /// UploadedDate
        /// </summary>
        public DateTime? UploadedDate { get; set; }

        /// <summary>
        /// File
        /// </summary>
        public string File { get; set; }

        /// <summary>
        /// Category
        /// </summary>
        public string Category { get; set; }

        /// <summary>
        /// Downloads
        /// </summary>
        public int? Downloads { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// VideoCode
        /// </summary>
        public string VideoCode { get; set; }

        /// <summary>
        /// FakeDownloads
        /// </summary>
        public int? FakeDownloads { get; set; }

        /// <summary>
        /// dsMax
        /// </summary>
        public bool dsMax { get; set; }

        /// <summary>
        /// Unreal
        /// </summary>
        public bool Unreal { get; set; }

        /// <summary>
        /// Unity
        /// </summary>
        public bool Unity { get; set; }

        /// <summary>
        /// Fbx
        /// </summary>
        public bool Fbx { get; set; }

        /// <summary>
        /// Youtube
        /// </summary>
        public bool Youtube { get; set; }

        /// <summary>
        /// PC
        /// </summary>
        public bool PC { get; set; }

        /// <summary>
        /// Mac
        /// </summary>
        public bool Mac { get; set; }

        /// <summary>
        /// Linux
        /// </summary>
        public bool Linux { get; set; }

        /// <summary>
        /// Android
        /// </summary>
        public bool Android { get; set; }

        /// <summary>
        /// iOS
        /// </summary>
        public bool iOS { get; set; }

        /// <summary>
        /// PS3
        /// </summary>
        public bool PS3 { get; set; }

        /// <summary>
        /// PS4
        /// </summary>
        public bool PS4 { get; set; }

        /// <summary>
        /// XBOX
        /// </summary>
        public bool XBOX { get; set; }

        /// <summary>
        /// Complete
        /// </summary>
        public bool Complete { get; set; }

        /// <summary>
        /// URLDownload
        /// </summary>
        public string URLDownload { get; set; }

        /// <summary>
        /// hasDemo
        /// </summary>
        public bool HasDemo { get; set; }

        /// <summary>
        /// IsGame
        /// </summary>
        public bool IsGame { get; set; }

    }
}
