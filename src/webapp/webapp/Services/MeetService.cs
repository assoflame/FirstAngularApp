using webapp.DataAccess;
using webapp.DataAccess.Interfaces;
using webapp.Services.Interfaces;
using webapp.Shared.DataTransferObjects;

namespace webapp.Services
{
    public class MeetService : IMeetService
    {
        private readonly IUnitOfWork _unitOfWork;

        public MeetService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<MeetData>> GetMeetsData()
        {
            var meetsData = (await _unitOfWork.Meets.GetMeets())
                .Select(meet => new MeetData(meet.Id, meet.CustomersMeets.Count()));

            return meetsData;
        }
    }
}
