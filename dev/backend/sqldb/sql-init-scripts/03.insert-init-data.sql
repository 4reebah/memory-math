-- Insert initial data for user table
INSERT INTO USERS(FIRST_NAME, LAST_NAME, EMAIL, USERNAME, PASSWORD_HASH, USER_POINTS, MILESTONE_REACHED) VALUES
	("Jake", "Lee", "jack@gmail.com", "jack123", "password", "2:00", 3);
INSERT INTO USERS(USER_ADMIN, FIRST_NAME, LAST_NAME, EMAIL, USERNAME, PASSWORD_HASH, SHORTEST_TIME, LOWEST_NUMBER_OF_MISTAKES) VALUES
	(0, "Sarah", "Jackson", "sarah@gmail.com", "sarah1", "password", "3:00", 5);
