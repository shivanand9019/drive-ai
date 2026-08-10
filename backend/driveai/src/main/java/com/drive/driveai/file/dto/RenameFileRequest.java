package com.drive.driveai.file.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RenameFileRequest {

    @NotBlank(message = "File name must not be blank")
    @Size(max = 255, message = "File name must not exceed 255 characters")
    @Pattern(regexp = "^[a-zA-Z0-9._-]+$",message = "File name contains invalid characters")
    private String fileName;

}
