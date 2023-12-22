using webapp.Shared.DataTransferObjects;

namespace webapp.Services.Interfaces
{
    public interface IMeetService
    {
        Task<IEnumerable<MeetData>> GetMeetsData();
    }
}
