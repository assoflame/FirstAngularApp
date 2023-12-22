using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace webapp.Migrations
{
    public partial class addMMtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Meets_MeetId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_MeetId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MeetId",
                table: "Users");

            migrationBuilder.CreateTable(
                name: "CustomerMeet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CustomerId = table.Column<int>(type: "integer", nullable: false),
                    MeetId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerMeet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomerMeet_Meets_MeetId",
                        column: x => x.MeetId,
                        principalTable: "Meets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomerMeet_Users_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomerMeet_CustomerId",
                table: "CustomerMeet",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerMeet_MeetId",
                table: "CustomerMeet",
                column: "MeetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerMeet");

            migrationBuilder.AddColumn<int>(
                name: "MeetId",
                table: "Users",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_MeetId",
                table: "Users",
                column: "MeetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Meets_MeetId",
                table: "Users",
                column: "MeetId",
                principalTable: "Meets",
                principalColumn: "Id");
        }
    }
}
