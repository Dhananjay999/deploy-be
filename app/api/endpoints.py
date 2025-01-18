from flask import Flask, jsonify, request
from app.constants.constant import VALID_MODES
from app.utils.conversation_count import ConvCountService

conv_count_service = ConvCountService()
def create_app():
    """Initialize Flask endpoints"""
    app = Flask(__name__)

    @app.route('/api/questionCount/getAll', methods=["GET"])
    def list_events():
        events = list(conv_count_service.get_all_conversation_count())
        return events

    @app.route("/api/questionCount/<user_id>", methods=["GET"])
    def add_event(user_id):
        try:
            modes = request.args.get('modes')
            mode_list = VALID_MODES if not modes else modes.split(",")
            # If no modes are provided, default to all modes
            invalid_modes = set(mode_list) - set(VALID_MODES)
            if invalid_modes:
                return jsonify({"error": f"Invalid modes: {', '.join(invalid_modes)}"}), 400
            # Get conversion count for provided user_id 
            count = conv_count_service.get_conversation_count_by_user(user_id)
            if count:
                filtered_list = {mode : count.get(mode) for mode in mode_list}
                return jsonify({"user_id": user_id , "mode_counts" : filtered_list}), 200
            else:
                return jsonify({"error": "User not found"}), 404

        except Exception as e:
            print("Error",e)
            return jsonify({"error": "An unexpected error occur"}), 500
        
    return app
