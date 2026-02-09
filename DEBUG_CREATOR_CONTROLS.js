// DEBUG HELPER - Add this temporarily to your DashboardCommunity.jsx

// In the useEffect where you set currentUser, add this:
useEffect(() => {
    loadCommunities();
    const user = localStorage.getItem("user");
    if (user) {
        try {
            const parsedUser = JSON.parse(user);
            console.log("=== CURRENT USER DEBUG ===");
            console.log("Full user object:", parsedUser);
            console.log("user.id:", parsedUser.id);
            console.log("user._id:", parsedUser._id);
            console.log("user.username:", parsedUser.username);
            console.log("========================");
            setCurrentUser(parsedUser);
        } catch (e) {
            console.error("Failed to parse user:", e);
        }
    } else {
        console.warn("No user found in localStorage!");
    }
}, []);

// In the community cards map, add this logging:
{
    filteredCommunities.map((community) => {
        // ADD THIS LOGGING
        console.log("=== COMMUNITY DEBUG ===");
        console.log("Community name:", community.name);
        console.log("Creator object:", community.creator);
        console.log("Creator ID:", community.creator?.id);
        console.log("Creator _ID:", community.creator?._id);
        console.log("Current User ID:", currentUser?.id);
        console.log("Current User _ID:", currentUser?._id);
        console.log("Match check:",
            (community.creator?._id && community.creator._id === currentUser?._id) ||
            (community.creator?.id && community.creator.id === currentUser?.id) ||
            (community.creator?.id && community.creator.id === currentUser?._id) ||
            (community.creator?._id && community.creator._id === currentUser?.id)
        );
        console.log("======================");

        return (
            <div>{/* ... rest of your code */}</div>
        );
    })
}
