import { useState } from "react";
import { motion } from "framer-motion";
import API from "../api";
import layoutStyles from "../styles/Layout.module.css";
import cardStyles from "../styles/Card.module.css";
import formStyles from "../styles/Form.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      // Keep button responsive even if navigation is blocked
      setIsSubmitting(false);
    }
  };

  return (
    <div className={layoutStyles.pageRoot}>
      <div className={layoutStyles.pageInner}>
        <motion.header
          className={layoutStyles.pageHeader}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={cardStyles.accentPill}>Secure Fintech Access</div>
          <h1 className={layoutStyles.appTitle}>LenDen Identity Portal</h1>
          <p className={layoutStyles.appSubtitle}>
            Log in to view your profile and encrypted Aadhaar details.
          </p>
        </motion.header>

        <div className={layoutStyles.contentRow}>
          <motion.section
            className={cardStyles.card}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className={cardStyles.cardHeader}>
              <div>
                <h2 className={cardStyles.cardTitle}>Welcome back</h2>
                <p className={cardStyles.cardMeta}>Sign in with your registered credentials.</p>
              </div>
            </div>

            <div className={cardStyles.cardBody}>
              {error && (
                <motion.div
                  className={formStyles.errorMessage}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              <form className={formStyles.form} onSubmit={handleLogin}>
                <div className={formStyles.fieldGroup}>
                  <div className={formStyles.labelRow}>
                    <label className={formStyles.label} htmlFor="email">
                      Email
                    </label>
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={formStyles.input}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className={formStyles.fieldGroup}>
                  <div className={formStyles.labelRow}>
                    <label className={formStyles.label} htmlFor="password">
                      Password
                    </label>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className={formStyles.input}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className={formStyles.primaryButton}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Login"}
                </motion.button>
              </form>
            </div>

            <div className={cardStyles.cardFooter}>
              <span>Don&apos;t have an account?</span>
              <button
                type="button"
                className={cardStyles.mutedLink}
                onClick={() => (window.location.href = "/register")}
              >
                Create one now
              </button>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

export default Login;
