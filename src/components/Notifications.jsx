import { useEffect, useState } from "react";

function Notifications({ onClose }) {

  const [notifications, setNotifications] =
    useState(() => {

      try {

        const savedNotifications =
          JSON.parse(
            localStorage.getItem(
              "formaAI_notifications"
            ) || "[]"
          );

        return Array.isArray(
          savedNotifications
        )
          ? savedNotifications
          : [];

      } catch {

        return [];

      }

    });


  /* =========================
     REFRESH NOTIFICATIONS
     ========================= */

  const loadNotifications = () => {

    try {

      const savedNotifications =
        JSON.parse(
          localStorage.getItem(
            "formaAI_notifications"
          ) || "[]"
        );

      setNotifications(
        Array.isArray(
          savedNotifications
        )
          ? savedNotifications
          : []
      );

    } catch (error) {

      console.error(
        "Unable to load notifications:",
        error
      );

      setNotifications([]);

    }

  };


  /* =========================
     LOAD / REFRESH
     ========================= */

  useEffect(() => {

    loadNotifications();

    const handleStorageChange = () => {

      loadNotifications();

    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {

      window.removeEventListener(
        "storage",
        handleStorageChange
      );

    };

  }, []);


  /* =========================
     UNREAD COUNT
     ========================= */

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;


  /* =========================
     MARK AS READ
     ========================= */

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


  /* =========================
     MARK ALL AS READ
     ========================= */

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


  /* =========================
     CLEAR ALL
     ========================= */

  const clearNotifications = () => {

    setNotifications([]);


    localStorage.removeItem(
      "formaAI_notifications"
    );

  };


  /* =========================
     GET NOTIFICATION ICON
     ========================= */

  const getIcon = (
    notification
  ) => {

    const type =
      notification?.type
        ?.toLowerCase();


    if (
      type === "success"
    ) {

      return "✓";

    }


    if (
      type === "warning"
    ) {

      return "⚠";

    }


    if (
      type === "review"
    ) {

      return "🔍";

    }


    if (
      type === "submitted"
    ) {

      return "✓";

    }


    if (
      type === "under_review"
    ) {

      return "👁";

    }


    if (
      type === "assessment"
    ) {

      return "🔍";

    }


    if (
      type === "completed"
    ) {

      return "✓";

    }


    return "🔔";

  };


  /* =========================
     GET NOTIFICATION TYPE
     ========================= */

  const getNotificationType = (
    notification
  ) => {

    if (
      notification?.type
    ) {

      return notification.type;

    }


    const title =
      notification?.title
        ?.toLowerCase() || "";


    if (
      title.includes("completed")
    ) {

      return "success";

    }


    if (
      title.includes("submitted")
    ) {

      return "success";

    }


    if (
      title.includes("review")
    ) {

      return "review";

    }


    if (
      title.includes("assessment")
    ) {

      return "review";

    }


    return "";

  };


  return (

    <div className="notification-panel">


      {/* =========================
          HEADER
          ========================= */}

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



      {/* =========================
          ACTIONS
          ========================= */}

      {notifications.length > 0 && (

        <div className="notification-actions">


          {unreadCount > 0 && (

            <button

              type="button"

              onClick={
                markAllAsRead
              }

            >

              Mark all as read

            </button>

          )}


          <button

            type="button"

            onClick={
              clearNotifications
            }

          >

            Clear all

          </button>

        </div>

      )}



      {/* =========================
          NOTIFICATION LIST
          ========================= */}

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

          notifications
            .slice()
            .reverse()
            .map(
              (notification) => {

                const notificationType =
                  getNotificationType(
                    notification
                  );


                return (

                  <button

                    type="button"

                    key={
                      notification.id
                    }

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


                    {/* ICON */}

                    <div

                      className={

                        `notification-icon ${notificationType}`

                      }

                    >

                      {getIcon(
                        notification
                      )}

                    </div>



                    {/* CONTENT */}

                    <div className="notification-content">


                      <div className="notification-title-row">

                        <strong>

                          {notification.title ||
                            "Notification"}

                        </strong>


                        {!notification.read && (

                          <span className="unread-dot" />

                        )}

                      </div>


                      <p>

                        {notification.message ||
                          "You have a new notification."}

                      </p>


                      <small>

                        {notification.time ||
                          "Just now"}

                      </small>


                    </div>


                  </button>

                );

              }
            )

        )}

      </div>


      {/* =========================
          FOOTER
          ========================= */}

      {notifications.length > 0 && (

        <div className="notification-panel-footer">

          <span>

            {notifications.length}{" "}

            {notifications.length === 1
              ? "notification"
              : "notifications"}

          </span>

        </div>

      )}

    </div>

  );

}


export default Notifications;