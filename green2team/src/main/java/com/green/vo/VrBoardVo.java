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
public class VrBoardVo {

	private long vrBoardNo;
	private String vrBoardTitle;
	private String vrBoardContent;
	private String vrThumbnailImgUrl;
	private String vrPanoramaViewerUrl;
	private long vrViews;
	private String vrWriter;
	private Date vrRegdate;
	private Date vrUpdatedate;
}
