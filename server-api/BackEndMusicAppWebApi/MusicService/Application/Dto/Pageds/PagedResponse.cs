namespace MusicService.Application.Dto.Pageds
{
    public class PagedResponse<T>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalElements { get; set; }
        public int TotalPages { get; set; }
        public List<T> Content { get; set; } = new();
    }
}
