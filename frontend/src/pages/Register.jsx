import { useState } from "react";
import { motion } from "framer-motion";
import API from "../api";
import layoutStyles from "../styles/Layout.module.css";
import cardStyles from "../styles/Card.module.css";
import formStyles from "../styles/Form.module.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    aadhaar: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await API.post("/auth/register", form);
      window.location.href = "/";
    } catch {
      setError("Registration failed");
    } finally {
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
          <div className={cardStyles.accentPill}>Create Secure Access</div>
          <h1 className={layoutStyles.appTitle}>Get started with LenDen</h1>
          <p className={layoutStyles.appSubtitle}>
            Register once to securely manage your profile and Aadhaar data.
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
                <h2 className={cardStyles.cardTitle}>Create an account</h2>
                <p className={cardStyles.cardMeta}>
                  We&apos;ll encrypt your Aadhaar and keep it safe.
                </p>
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

              <form className={formStyles.form} onSubmit={handleRegister}>
                <div className={formStyles.fieldGroup}>
                  <div className={formStyles.labelRow}>
                    <label className={formStyles.label} htmlFor="name">
                      Full Name
                    </label>
                  </div>
                  <input
                    id="name"
                    className={formStyles.input}
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

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
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
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
                    placeholder="At least 6 characters"
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className={formStyles.fieldGroup}>
                  <div className={formStyles.labelRow}>
                    <label className={formStyles.label} htmlFor="aadhaar">
                      Aadhaar ID
                    </label>
                    <span className={formStyles.helperText}>
                      Stored securely using strong encryption.
                    </span>
                  </div>
                  <input
                    id="aadhaar"
                    className={formStyles.input}
                    placeholder="XXXX-XXXX-XXXX"
                    value={form.aadhaar}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        aadhaar: e.target.value,
                      })
                    }
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
                  {isSubmitting ? "Creating account..." : "Register"}
                </motion.button>
              </form>
            </div>

            <div className={cardStyles.cardFooter}>
              <span>Already registered?</span>
              <button
                type="button"
                className={cardStyles.mutedLink}
                onClick={() => (window.location.href = "/")}
              >
                Back to login
              </button>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

export default Register;
