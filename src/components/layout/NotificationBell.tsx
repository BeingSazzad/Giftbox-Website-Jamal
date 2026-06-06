"use client";

import { BellOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useEffect, useState } from "react";
import { getNotificationsAction } from "@/actions/notification";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function NotificationBell({ className }: { className?: string }) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getNotificationsAction(1, 10);
      if (res?.success) {
        setNotifications(res.data || []);
        setUnreadCount(res?.meta?.unreadCount || 0);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      onOpenChange={(open) => {
        if (open && unreadCount > 0) {
          // Future implementation: mark as read logic could go here
        }
      }}
      popupRender={() => (
        <div className="bg-[#110a20] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 w-80 max-h-[400px] flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 bg-white/2 shrink-0 flex items-center justify-between">
            <span className="text-white font-bold text-sm">Notifications</span>
            {unreadCount > 0 && (
              <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount} New
              </span>
            )}
          </div>
          
          <div className="overflow-y-auto flex-1 custom-scrollbar">
            {loading ? (
              <div className="p-8 flex justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            ) : notifications.length > 0 ? (
              <div className="flex flex-col">
                {notifications.map((notif) => (
                  <div 
                    key={notif._id} 
                    className={`p-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors cursor-pointer ${notif.read ? 'opacity-60' : 'bg-primary/5'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${notif.read ? 'bg-white/10 text-white/50' : 'bg-primary/20 text-primary'}`}>
                        <BellOutlined style={{ fontSize: 14 }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm m-0 mb-1 truncate">{notif.title}</h4>
                        <p className="text-white/60 text-xs m-0 line-clamp-2 leading-relaxed">{notif.text}</p>
                        <span className="text-white/40 text-[10px] mt-2 block">
                          {dayjs(notif.createdAt).fromNow()}
                        </span>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-white/40 flex flex-col items-center justify-center gap-3">
                <BellOutlined className="text-3xl opacity-20" />
                <p className="text-xs m-0">You have no new notifications.</p>
              </div>
            )}
          </div>
        </div>
      )}
    >
      <button
        type="button"
        aria-label="Notifications"
        className={className || "w-10 h-10 min-w-[40px] rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center cursor-pointer relative transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0514]"}
      >
        <BellOutlined style={{ fontSize: 16 }} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#FF3B30] border border-[#0a0514]" />
        )}
      </button>
    </Dropdown>
  );
}
