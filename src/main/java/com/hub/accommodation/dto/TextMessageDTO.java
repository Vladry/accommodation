package com.hub.accommodation.dto;

public class TextMessageDTO {

	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return 	"message='" + message + '\'' +
				'}';
	}
}