using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class test : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Abouts",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Tekst = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Abouts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Documents",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Group = table.Column<string>(nullable: true),
                    Link = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Meetings",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meetings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TextMessage = table.Column<string>(nullable: true),
                    CurrentDate = table.Column<DateTime>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    IsApproved = table.Column<bool>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    LikeCounter = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "News",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Content = table.Column<string>(nullable: true),
                    DateNow = table.Column<DateTime>(nullable: false),
                    DateOfEvent = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Attachment",
                columns: table => new
                {
                    AttachmentId = table.Column<Guid>(nullable: false),
                    AttachmentFileName = table.Column<string>(nullable: true),
                    AttachmentFileReference = table.Column<string>(nullable: true),
                    MessageId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attachment", x => x.AttachmentId);
                    table.ForeignKey(
                        name: "FK_Attachment_Message_MessageId",
                        column: x => x.MessageId,
                        principalTable: "Message",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    CommentId = table.Column<Guid>(nullable: false),
                    TextComment = table.Column<string>(nullable: true),
                    CurrentDateTime = table.Column<DateTime>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    MessageId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.CommentId);
                    table.ForeignKey(
                        name: "FK_Comment_Message_MessageId",
                        column: x => x.MessageId,
                        principalTable: "Message",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserLike",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    Liked = table.Column<bool>(nullable: false),
                    MessageId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLike", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserLike_Message_MessageId",
                        column: x => x.MessageId,
                        principalTable: "Message",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Firstname = table.Column<string>(nullable: true),
                    Lastname = table.Column<string>(nullable: true),
                    Department = table.Column<string>(nullable: true),
                    Position = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Telephone = table.Column<string>(nullable: true),
                    ExtensionNumber = table.Column<string>(nullable: true),
                    StartOfWork = table.Column<DateTime>(nullable: false),
                    EmployeePictureAttachmentId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_Attachment_EmployeePictureAttachmentId",
                        column: x => x.EmployeePictureAttachmentId,
                        principalTable: "Attachment",
                        principalColumn: "AttachmentId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Literatures",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Group = table.Column<string>(nullable: true),
                    Link = table.Column<string>(nullable: true),
                    FilesAttachmentId = table.Column<Guid>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    IsApproved = table.Column<bool>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Literatures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Literatures_Attachment_FilesAttachmentId",
                        column: x => x.FilesAttachmentId,
                        principalTable: "Attachment",
                        principalColumn: "AttachmentId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attachment_MessageId",
                table: "Attachment",
                column: "MessageId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_MessageId",
                table: "Comment",
                column: "MessageId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeePictureAttachmentId",
                table: "Employees",
                column: "EmployeePictureAttachmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Literatures_FilesAttachmentId",
                table: "Literatures",
                column: "FilesAttachmentId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLike_MessageId",
                table: "UserLike",
                column: "MessageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Abouts");

            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropTable(
                name: "Documents");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Literatures");

            migrationBuilder.DropTable(
                name: "Meetings");

            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropTable(
                name: "UserLike");

            migrationBuilder.DropTable(
                name: "Attachment");

            migrationBuilder.DropTable(
                name: "Message");
        }
    }
}
