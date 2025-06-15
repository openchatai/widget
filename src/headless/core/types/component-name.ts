export type OpenCxComponentNameU =
  /* ------------------------------------------------------ */
  /*                         Trigger                        */
  /* ------------------------------------------------------ */
  | 'trigger/btn'

  /* ------------------------------------------------------ */
  /*                     Sessions Screen                    */
  /* ------------------------------------------------------ */
  | 'sessions/header'
  | 'sessions/new_conversation_btn'

  /* ------------------------------------------------------ */
  /*                       Chat Screen                      */
  /* ------------------------------------------------------ */
  | 'chat/root'
  | 'chat/header'
  | 'chat/msgs/root'
  /* -------------------- Agent Message ------------------- */
  | 'chat/agent_msg_group/root'
  | 'chat/agent_msg_group/avatar_and_msgs/root'
  | 'chat/agent_msg_group/avatar_and_msgs/avatar'
  | 'chat/agent_msg_group/avatar_and_msgs/msgs'
  | 'chat/agent_msg_group/root/avatar'
  | 'chat/agent_msg_group/suggestions'
  | 'chat/agent_msg/root'
  | 'chat/agent_msg/msg'
  /* ------------- Persistent Initial Messages ------------ */
  | 'chat/persistent_initial_msgs/root'
  | 'chat/persistent_initial_msg/root'
  | 'chat/persistent_initial_msg/msg'
  /* -------------------- Chat Message -------------------- */
  | 'chat/user_msg_group/root'
  | 'chat/user_msg_group/avatar/root'
  | 'chat/user_msg/root'
  | 'chat/user_msg/msg'
  /* --------------------- Chat Input --------------------- */
  | 'chat/input_box/root'
  | 'chat/input_box/inner_root'
  | 'chat/input_box/textarea_and_attachments_container'
  | 'chat/input_box/textarea'
  | 'chat/input_box/attachments_container'
  /* --------------------- Chat Utils --------------------- */
  | 'chat/bot_loading/root'
  | 'chat/bot_loading/bouncing_dots_container'
  | 'chat/suggested_reply_btn'
  | 'chat/might_solve_user_issue_suggested_replies_container';
