CREATE TABLE dbo.StudentApplications (
  Id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
  ParentName NVARCHAR(120) NOT NULL,
  Email NVARCHAR(160) NOT NULL,
  StudentGrade NVARCHAR(80) NOT NULL,
  Status NVARCHAR(40) NOT NULL DEFAULT 'New',
  SubmittedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT CK_StudentApplications_ParentName_NotBlank CHECK (LEN(LTRIM(RTRIM(ParentName))) > 0),
  CONSTRAINT CK_StudentApplications_Email_NotBlank CHECK (LEN(LTRIM(RTRIM(Email))) > 0),
  CONSTRAINT CK_StudentApplications_StudentGrade_Allowed CHECK (
    StudentGrade IN (
      'Kindergarten',
      'Grade 1',
      'Grade 2',
      'Grade 3',
      'Grade 4',
      'Grade 5',
      'Grade 6',
      'Grade 7',
      'Grade 8',
      'Grade 9'
    )
  ),
  CONSTRAINT CK_StudentApplications_Status_Allowed CHECK (
    Status IN ('New', 'Contacted', 'Tour Scheduled', 'Enrolled', 'Closed')
  )
);

CREATE INDEX IX_StudentApplications_SubmittedAt
ON dbo.StudentApplications (SubmittedAt DESC);

CREATE UNIQUE INDEX UX_StudentApplications_Email
ON dbo.StudentApplications (Email);

GO

CREATE OR ALTER PROCEDURE dbo.CreateStudentApplication
  @ParentName NVARCHAR(120),
  @Email NVARCHAR(160),
  @StudentGrade NVARCHAR(80)
AS
BEGIN
  SET NOCOUNT ON;

  INSERT INTO dbo.StudentApplications (ParentName, Email, StudentGrade)
  VALUES (LTRIM(RTRIM(@ParentName)), LOWER(LTRIM(RTRIM(@Email))), @StudentGrade);
END;
