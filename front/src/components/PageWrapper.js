// src/components/PageWrapper.js
import React from "react";
import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="max-w-[1200px] mx-auto px-4 py-6"
        >
            {children}
        </motion.div>
    );
};

export default PageWrapper;
