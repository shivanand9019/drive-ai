package com.drive.driveai.file.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor 
@NoArgsConstructor
public class DashboardResponse {


private long totalFiles;
private long filesUploadedThisMonth;
private long aiProcessedFiles;
private long duplicateFiles;

}
