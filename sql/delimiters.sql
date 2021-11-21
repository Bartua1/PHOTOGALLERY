DELIMITER //
CREATE OR REPLACE TRIGGER MaximumOfPhotosReached BEFORE INSERT ON Photos
FOR EACH ROW
BEGIN
	IF (SELECT COUNT(*) FROM Photos WHERE (userId = new.userId)) >= 2 THEN
		SIGNAL SQLSTATE '45000' SET message_text =
		'You cannot have more than 2 photos';
	END IF;
END //