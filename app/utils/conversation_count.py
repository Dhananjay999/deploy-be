from app.constants.constant import VALID_MODES
from app.db.mongo_db_client import MongDBClient
from app.utils.logger import get_logger


class ConvCountService:
    """Conversation Count Service"""
    def __init__(self):
        self.logger = get_logger(__name__)
        self.conv_count_collection = MongDBClient().get_collection('question_count')

    def get_all_conversation_count(self):
        """Get all conversation counts for a all users"""
        return self.conv_count_collection.find({}, {"_id": 0})

    def insert_conversation_count(self, user_id:str, mode_name:str)->bool:
        """
        Increment the conversation count for a user in a specific mode.
        And Creating new entry if user not found
        Returns True if the operation is successful, False otherwise.
        """
        try:
            self.conv_count_collection.update_one(
                       {'user_id': user_id},
                        {
                            '$inc': {mode_name: 1},
                            '$setOnInsert': {mode: 0 for mode in VALID_MODES if mode != mode_name},
                        },
                        upsert=True
                    )
            
        except Exception as e:
            self.logger.error("Error inserting conversation count: %s",str(e))
            return False
        return True
    
    def get_conversation_count_by_user(self, user_id:str):
        """ get user conversation count by user """
        try:
            result = self.conv_count_collection.find_one({'user_id':user_id},{"_id": 0})
            return result
        except Exception as e:
            self.logger.error("Error while getting conversation count: %s",str(e))
            return None

        