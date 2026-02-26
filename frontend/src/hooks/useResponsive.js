import { useState, useEffect } from "react";

const useResponsive = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {
        width: windowSize.width,
        height: windowSize.height,
        isMobile: windowSize.width < 769,
        isTablet: windowSize.width >= 769 && windowSize.width < 1024,
        isDesktop: windowSize.width >= 1024,
        isSmallMobile: windowSize.width < 532,
    };
};

export default useResponsive;
