USE aiqbal$default;

-- Insert initial data for user table
INSERT INTO USERS(USER_ADMIN, FIRST_NAME, LAST_NAME, EMAIL, USERNAME, PASSWORD_HASH, SHORTEST_TIME, LOWEST_NUMBER_OF_MISTAKES) VALUES
	(0, "Sarah", "Jackson", "sarah@gmail.com", "sarah1", "$2b$12$ishVjVhEtsqRbqxXFlbb5.e/ejziPHjNBgmyUeNOtuWXzz.vGc57a", "00:01:20", 5);
INSERT INTO USERS(USER_ADMIN, FIRST_NAME, LAST_NAME, EMAIL, USERNAME, PASSWORD_HASH, SHORTEST_TIME, LOWEST_NUMBER_OF_MISTAKES) VALUES
	(0, "Colin", "Key", "colin.key@gmail.com", "colin123", "$2b$12$ishVjVhEtsqRbqxXFlbb5.e/ejziPHjNBgmyUeNOtuWXzz.vGc57a", "00:01:37", 3);
INSERT INTO USERS(USER_ADMIN, FIRST_NAME, LAST_NAME, EMAIL, USERNAME, PASSWORD_HASH, SHORTEST_TIME, LOWEST_NUMBER_OF_MISTAKES) VALUES
	(1, "Admin", "Admin", "admin@gmail.com", "admin", "$2b$12$ishVjVhEtsqRbqxXFlbb5.e/ejziPHjNBgmyUeNOtuWXzz.vGc57a", "00:01:30", 5);

