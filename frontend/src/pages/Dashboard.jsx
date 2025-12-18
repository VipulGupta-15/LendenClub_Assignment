import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../api";
import layoutStyles from "../styles/Layout.module.css";
import dashboardStyles from "../styles/Dashboard.module.css";
import cardStyles from "../styles/Card.module.css";
import formStyles from "../styles/Form.module.css";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Frontend hardening: if there is no token, redirect away from dashboard immediately.
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    const handlePageShow = (event) => {
      // When navigating back from history/bfcache, ensure a missing token cannot show this view.
      if (event.persisted || localStorage.getItem("token") == null) {
        window.location.href = "/";
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    API.get("/profile/me")
      .then((res) => setProfile(res.data))
      .catch(() => setError("Unauthorized access"));
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  if (error) {
    return (
      <div className={layoutStyles.pageRoot}>
        <motion.div
          className={dashboardStyles.errorState}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={layoutStyles.pageRoot}>
        <motion.div
          className={dashboardStyles.loadingState}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Loading your profile securely...
        </motion.div>
      </div>
    );
  }

  return (
    <div className={layoutStyles.pageRoot}>
      <div className={layoutStyles.pageInner}>
        <motion.header
          className={layoutStyles.pageHeader}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={cardStyles.accentPill}>Dashboard</div>
          <h1 className={layoutStyles.appTitle}>Profile overview</h1>
          <p className={layoutStyles.appSubtitle}>
            Review your verified identity details and encrypted Aadhaar.
          </p>
        </motion.header>

        <div className={dashboardStyles.profileLayout}>
          {/* Left: primary profile card */}
          <motion.section
            className={dashboardStyles.profileCard}
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className={dashboardStyles.profileHeadingRow}>
              <div>
                <div className={dashboardStyles.profileLabel}>Account holder</div>
                <div className={dashboardStyles.profileName}>{profile.name}</div>
              </div>
            </div>

            <div className={dashboardStyles.profileField}>
              <span className={dashboardStyles.profileFieldLabel}>Email</span>
              <span className={dashboardStyles.profileFieldValue}>{profile.email}</span>
            </div>

            <div className={dashboardStyles.profileField}>
              <span className={dashboardStyles.profileFieldLabel}>Aadhaar ID (decrypted)</span>
              <span
                className={`${dashboardStyles.profileFieldValue} ${dashboardStyles.profileFieldHighlight}`}
              >
                {profile.aadhaar}
              </span>
            </div>

            <p className={dashboardStyles.profileMeta}>
              <span className={dashboardStyles.statusDot} />
              Encryption active. Only you can see your Aadhaar details after secure login.
            </p>

            <div className={dashboardStyles.profileActions}>
              <div className={dashboardStyles.profileTag}>Signed in as {profile.email}</div>
              <motion.button
                type="button"
                className={formStyles.logoutButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Keep the existing logout behavior exactly the same.
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
              >
                Logout
              </motion.button>
            </div>
          </motion.section>

          {/* Right: side insights / description panel (purely visual) */}
          <motion.aside
            className={dashboardStyles.sidePanel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          >
            <div className={dashboardStyles.sideTitle}>Security insights</div>
            <p>
              Your Aadhaar is never shown or transmitted in plain text outside this secure view.
              It is decrypted only after successful authentication from this dashboard.
            </p>
            <p>
              Logging out will immediately clear your access token from this device while keeping
              your encrypted data safe on the server.
            </p>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
