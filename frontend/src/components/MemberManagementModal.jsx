import React, { useState, useEffect } from "react";
import {
    XMarkIcon,
    TrashIcon,
    UserGroupIcon,
    AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { communityAPI } from "../utils/communityAPI";
import { useToast } from "../context/ToastContext";
import { useConfirm } from "./ConfirmModal";

const MemberManagementModal = ({
    isOpen,
    onClose,
    communityId,
    creatorId,
    currentUserId,
}) => {
    const toast = useToast();
    const confirm = useConfirm();
    const [members, setMembers] = useState([]);
    const [customRoles, setCustomRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [removingId, setRemovingId] = useState(null);
    const [roleChangingId, setRoleChangingId] = useState(null);
    const [selectedRole, setSelectedRole] = useState({});

    useEffect(() => {
        if (isOpen) {
            loadMembers();
        }
    }, [isOpen]);

    const loadMembers = async () => {
        setLoading(true);
        try {
            const response = await communityAPI.getMembers(communityId);
            setMembers(response.data || []);
            setCustomRoles(response.customRoles || []);
        } catch (err) {
            toast.error(err.message || "Failed to load members");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveMember = async (userId) => {
        const confirmed = await confirm({
            title: "Remove Member?",
            message: "Are you sure you want to remove this member from the community? They will lose access to all community content.",
            confirmText: "Remove",
            cancelText: "Cancel",
            variant: "danger",
        });

        if (!confirmed) return;

        setRemovingId(userId);
        try {
            await communityAPI.removeMember(communityId, userId);
            toast.success("Member removed successfully!");
            await loadMembers();
        } catch (err) {
            toast.error(err.message || "Failed to remove member");
        } finally {
            setRemovingId(null);
        }
    };

    const handleChangeRole = async (userId, newRole) => {
        if (newRole === selectedRole[userId]) return;

        setRoleChangingId(userId);
        try {
            await communityAPI.assignMemberRole(communityId, userId, newRole);
            toast.success("Member role updated successfully!");
            setSelectedRole((prev) => ({ ...prev, [userId]: newRole }));
            await loadMembers();
        } catch (err) {
            toast.error(err.message || "Failed to update role");
        } finally {
            setRoleChangingId(null);
        }
    };

    if (!isOpen) return null;

    const isCreator =
        currentUserId &&
        creatorId &&
        currentUserId.toString() === creatorId.toString();

    const modalOverlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    };

    const modalStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1.25rem",
        padding: "2rem",
        maxWidth: "600px",
        width: "90vw",
        maxHeight: "80vh",
        overflow: "auto",
        border: "1px solid var(--input-border)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
    };

    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
    };

    const titleStyle = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        margin: 0,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    };

    const closeButtonStyle = {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0.5rem",
        color: "var(--color-gray-600)",
        transition: "color 0.2s ease",
    };

    const memberListStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    };

    const memberItemStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        background: "var(--input-bg)",
        borderRadius: "0.75rem",
        border: "1px solid var(--input-border)",
    };

    const avatarStyle = {
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "50%",
        background:
            "linear-gradient(130deg, rgba(59,130,246,0.2), rgba(14,165,233,0.2))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-primary-700)",
        fontWeight: 700,
        flexShrink: 0,
    };

    const memberInfoStyle = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
    };

    const memberNameStyle = {
        fontSize: "0.95rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const memberRoleStyle = {
        fontSize: "0.85rem",
        color: "#94a3b8",
    };

    const memberActionsStyle = {
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
    };

    const roleSelectStyle = {
        padding: "0.4rem 0.75rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--input-border)",
        background: "var(--input-bg)",
        color: "var(--color-gray-900)",
        fontSize: "0.85rem",
        cursor: "pointer",
        fontFamily: "inherit",
    };

    const deleteButtonStyle = {
        background: "rgba(239, 68, 68, 0.1)",
        color: "#dc2626",
        border: "none",
        padding: "0.5rem 0.75rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        fontSize: "0.85rem",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        transition: "all 0.2s ease",
    };



    const emptyStyle = {
        textAlign: "center",
        padding: "2rem 1rem",
        color: "var(--color-gray-600)",
    };

    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={headerStyle}>
                    <h2 style={titleStyle}>
                        <UserGroupIcon
                            style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                        Manage Members
                    </h2>
                    <button
                        style={closeButtonStyle}
                        onClick={onClose}
                        type="button"
                    >
                        <XMarkIcon
                            style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                    </button>
                </div>

                {loading ? (
                    <div style={emptyStyle}>Loading members...</div>
                ) : members.length === 0 ? (
                    <div style={emptyStyle}>No members yet</div>
                ) : (
                    <div style={memberListStyle}>
                        {members.map((member) => (
                            <div key={member._id} style={memberItemStyle}>
                                <div style={avatarStyle}>
                                    {member.userId?.username
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>
                                <div style={memberInfoStyle}>
                                    <div style={memberNameStyle}>
                                        {member.userId?.username || "Unknown"}
                                        {member.isCreator && (
                                            <span
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    fontSize: "0.8rem",
                                                }}
                                            >
                                                👑
                                            </span>
                                        )}
                                    </div>
                                    <div style={memberRoleStyle}>
                                        {member.role} • Joined{" "}
                                        {new Date(
                                            member.joinedAt
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                                <div style={memberActionsStyle}>
                                    {!member.isCreator && isCreator && (
                                        <>
                                            <select
                                                style={roleSelectStyle}
                                                value={
                                                    selectedRole[
                                                    member.userId._id
                                                    ] || member.role
                                                }
                                                onChange={(e) =>
                                                    handleChangeRole(
                                                        member.userId._id,
                                                        e.target.value
                                                    )
                                                }
                                                disabled={
                                                    roleChangingId ===
                                                    member.userId._id
                                                }
                                            >
                                                <option value="Administrator">
                                                    Administrator
                                                </option>
                                                <option value="Member">
                                                    Member
                                                </option>
                                                {customRoles.map(cr => (
                                                    <option key={cr.name} value={cr.name}>
                                                        {cr.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                style={deleteButtonStyle}
                                                onClick={() =>
                                                    handleRemoveMember(
                                                        member.userId._id
                                                    )
                                                }
                                                disabled={
                                                    removingId ===
                                                    member.userId._id
                                                }
                                                type="button"
                                            >
                                                <TrashIcon
                                                    style={{
                                                        width: "1rem",
                                                        height: "1rem",
                                                    }}
                                                />
                                                {removingId ===
                                                    member.userId._id
                                                    ? "Removing..."
                                                    : "Remove"}
                                            </button>
                                        </>
                                    )}
                                    {member.isCreator && (
                                        <div
                                            style={{
                                                fontSize: "0.85rem",
                                                fontWeight: 600,
                                                color: "var(--color-primary-600)",
                                                padding: "0.4rem 0.75rem",
                                                background:
                                                    "rgba(59, 130, 246, 0.1)",
                                                borderRadius: "0.5rem",
                                            }}
                                        >
                                            👑 Creator
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemberManagementModal;
