namespace webapp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public int? Age { get; set; }
        public string Role { get; set; }
        public string PasswordHash { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }

        public IEnumerable<CustomerMeet> CustomerMeets { get; set; }
    }
}
