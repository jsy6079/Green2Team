package com.green.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Alias("condition")
public class ConditionValue {

	private int pageNum;
	private int amount;

	public ConditionValue() {
		this(1, 9);
	}
}
