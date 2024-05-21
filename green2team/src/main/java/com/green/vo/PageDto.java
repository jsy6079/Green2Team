package com.green.vo;

import lombok.Data;

@Data
public class PageDto {
	
	private int startPage;
	private int endPage;
	private boolean prev, next;

	private int total;
	private ConditionValue cv;

	public PageDto(ConditionValue cv, int total) {
		this.cv = cv;
		this.total = total;

		this.endPage = ((cv.getPageNum() + 9) / 10) * 10;
		this.startPage = this.endPage - 9;

		int realEndPage = (int) (Math.ceil(this.total / (cv.getAmount() * 1.0)));

		if (realEndPage < this.endPage) {
			this.endPage = realEndPage;
		}

		this.prev = this.startPage != 1;
		this.next = this.endPage < realEndPage;
	}

}
