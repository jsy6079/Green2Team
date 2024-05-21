package com.green.vo;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VideoBoardVo {

	private long videoBoardNo;
	private String videoBoardTitle;
	private String videoBoardContent;
	private String videoThumbnailImgUrl;
	private String videoViewerUrl;
	private long videoViews;
	private String videoWriter;
	private Date videoRegdate;
	private Date videoUpdatedate;
}
