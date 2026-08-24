import { useEffect, useState } from "react";

function Notifications({ onClose }) {

  const [notifications, setNotifications] =
    useState(() => {
      try {
        return JSON.parse(
          localStorage.getItem(
            "formaAI_notifications"
          ) || "[]"
        );
      } catch {
        return [];
      }
    });


  const unreadCount = notifications.filter(
    (notification) =>
      !notification.read
  ).length;


  const markAsRead = (id) => {

    const updated =
      notifications.map(
        (notification) =>
          notification.id === id
            ? {
                ...notification,
                read: true
              }
            : notification
      );


    setNotifications(updated);

    localStorage.setItem(
      "formaAI_notifications",
      JSON.stringify(updated)
    );
  };


  const markAllAsRead = () => {

    const updated =
      notifications.map(
        (notification) => ({
          ...notification,
          read: true
        })
      );


    setNotifications(updated);

    localStorage.setItem(
      "formaAI_notifications",
      JSON.stringify(updated)
    );
  };


  const clearNotifications = () => {

    setNotifications([]);

    localStorage.removeItem(
      "formaAI_notifications"
    );
  };


  const getIcon = (type) => {

    if (type === "success") {
      return "✓";
    }

    if (type === "warning") {
      return "⚠";
    }

    if (type === "review") {
      return "🔍";
    }

    return "🔔";
  };


  return (
    <div className="notification-panel">

      {/* HEADER */}

      <div className="notification-panel-header">

        <div>

          <h3>
            Notifications
          </h3>

          <span>
            {unreadCount > 0
              ? `${unreadCount} unread`
              : "All caught up"}
          </span>

        </div>


        <button
          type="button"
          className="notification-close"
          onClick={onClose}
        >
          ×
        </button>

      </div>


      {/* ACTIONS */}

      {notifications.length > 0 && (

        <div className="notification-actions">

          {unreadCount > 0 && (

            <button
              type="button"
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>

          )}


          <button
            type="button"
            onClick={clearNotifications}
          >
            Clear all
          </button>

        </div>

      )}


      {/* LIST */}

      <div className="notification-list">

        {notifications.length === 0 ? (

          <div className="notification-empty">

            <div className="notification-empty-icon">
              🔔
            </div>

            <h4>
              No Notifications
            </h4>

            <p>
              You're all caught up.
            </p>

          </div>

        ) : (

          notifications.map(
            (notification) => (

              <button
                type="button"
                key={notification.id}
                className={
                  notification.read
                    ? "notification-item"
                    : "notification-item unread"
                }
                onClick={() =>
                  markAsRead(
                    notification.id
                  )
                }
              >

                <div
                  className={
                    `notification-icon ${notification.type || ""}`
                  }
                >
                  {getIcon(
                    notification.type
                  )}
                </div>


                <div className="notification-content">

                  <div className="notification-title-row">

                    <strong>
                      {notification.title}
                    </strong>

                    {!notification.read && (
                      <span className="unread-dot" />
                    )}

                  </div>


                  <p>
                    {notification.message}
                  </p>


                  <small>
                    {notification.time ||
                      "Just now"}
                  </small>

                </div>

              </button>

            )
          )

        )}

      </div>

    </div>
  );
}


export default Notifications;