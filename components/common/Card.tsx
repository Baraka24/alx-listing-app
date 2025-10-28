import React, { memo, useCallback, useMemo, useState } from "react";

export type CardProps = {
    id: string;
    title: string;
    imageUrl: string | string[];
    location?: { city?: string; region?: string; country?: string } | string;
    pricePerNight: number;
    currency?: string;
    rating?: number; // 0..5
    reviewCount?: number;
    isFavorite?: boolean;
    isSuperhost?: boolean;
    isNew?: boolean;
    dateRange?: string; // e.g. "Jun 10–15"
    onClick?: (id: string) => void;
    onFavoriteToggle?: (id: string, next: boolean) => void;
    className?: string;
    footer?: React.ReactNode;
};

const styles: Record<string, React.CSSProperties> = {
    card: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow:
            "0 0 0 1px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.06), 0 12px 24px rgba(0,0,0,0.04)",
        transition: "transform 120ms ease, box-shadow 120ms ease",
        cursor: "pointer",
    },
    clickable: {
        outline: "none",
    },
    imageWrap: {
        position: "relative",
        width: "100%",
        paddingTop: "66.66%", // 3:2 ratio
        backgroundColor: "#f3f4f6",
        overflow: "hidden",
    },
    image: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 250ms ease",
    },
    navBtn: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        background: "rgba(255,255,255,0.9)",
        border: "none",
        width: 32,
        height: 32,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    },
    navPrev: { left: 8 },
    navNext: { right: 8 },
    dots: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 8,
        display: "flex",
        justifyContent: "center",
        gap: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 999,
        background: "rgba(255,255,255,0.7)",
    },
    dotActive: {
        background: "#fff",
    },
    favoriteBtn: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 36,
        height: 36,
        border: "none",
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: "rgba(255,255,255,0.95)",
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    },
    badgeWrap: {
        position: "absolute",
        top: 8,
        left: 8,
        display: "flex",
        gap: 6,
    },
    badge: {
        fontSize: 12,
        fontWeight: 600,
        color: "#111827",
        background: "#fff",
        padding: "4px 8px",
        borderRadius: 999,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    },
    body: {
        padding: 12,
        display: "grid",
        gap: 6,
    },
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        color: "#111827",
        margin: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    location: {
        fontSize: 14,
        color: "#4b5563",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    priceRow: {
        display: "flex",
        alignItems: "baseline",
        gap: 6,
    },
    price: {
        fontSize: 15,
        color: "#111827",
    },
    bold: {
        fontWeight: 700,
    },
    rating: {
        fontSize: 14,
        color: "#111827",
        display: "flex",
        alignItems: "center",
        gap: 4,
    },
    footer: {
        padding: "0 12px 12px",
    },
};

function formatCurrency(value: number, currency = "USD", locale?: string) {
    try {
        return new Intl.NumberFormat(locale || undefined, {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(value);
    } catch {
        return `${currency} ${Math.round(value)}`;
    }
}

function resolveLocation(loc?: CardProps["location"]) {
    if (!loc) return "";
    if (typeof loc === "string") return loc;
    const parts = [loc.city, loc.region, loc.country].filter(Boolean);
    return parts.join(", ");
}

export const Card = memo(function Card(props: CardProps) {
    const {
        id,
        title,
        imageUrl,
        location,
        pricePerNight,
        currency = "USD",
        rating,
        reviewCount,
        isFavorite,
        isSuperhost,
        isNew,
        dateRange,
        onClick,
        onFavoriteToggle,
        className,
        footer,
    } = props;

    const images = useMemo(() => {
        const arr = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
        return arr.length ? arr : [""];
    }, [imageUrl]);

    const [index, setIndex] = useState(0);
    const locationText = useMemo(() => resolveLocation(location), [location]);
    const priceText = useMemo(() => formatCurrency(pricePerNight, currency), [pricePerNight, currency]);

    const handleNext = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            setIndex((i) => (i + 1) % images.length);
        },
        [images.length]
    );

    const handlePrev = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            setIndex((i) => (i - 1 + images.length) % images.length);
        },
        [images.length]
    );

    const handleFav = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            onFavoriteToggle?.(id, !isFavorite);
        },
        [onFavoriteToggle, id, isFavorite]
    );

    const handleClick = useCallback(() => onClick?.(id), [onClick, id]);

    const handleKey = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.(id);
            }
        },
        [onClick, id]
    );

    const heart = isFavorite ? "❤️" : "🤍";
    const star = "★";

    return (
        <div
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : -1}
            onClick={handleClick}
            onKeyDown={onClick ? handleKey : undefined}
            className={className}
            style={{ ...styles.card, ...(onClick ? styles.clickable : {}) }}
            data-card
            data-id={id}
        >
            <div style={styles.imageWrap}>
                {images.map((src, i) => (
                    <img
                        key={i}
                        src={src || "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' fill='%239ca3af'%3ENo image%3C/text%3E%3C/svg%3E"}
                        alt={title}
                        style={{
                            ...styles.image,
                            transform: i === index ? "scale(1.04)" : "translateX(100%)",
                            transitionProperty: "transform, opacity",
                            opacity: i === index ? 1 : 0,
                        }}
                        loading={i === 0 ? "eager" : "lazy"}
                    />
                ))}

                <div style={styles.badgeWrap}>
                    {isNew && <span style={styles.badge}>New</span>}
                    {isSuperhost && <span style={styles.badge}>Superhost</span>}
                    {dateRange && <span style={styles.badge}>{dateRange}</span>}
                </div>

                {onFavoriteToggle && (
                    <button
                        type="button"
                        aria-label={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
                        onClick={handleFav}
                        style={styles.favoriteBtn}
                        data-favorite
                    >
                        {heart}
                    </button>
                )}

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            aria-label="Previous photo"
                            onClick={handlePrev}
                            style={{ ...styles.navBtn, ...styles.navPrev }}
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            aria-label="Next photo"
                            onClick={handleNext}
                            style={{ ...styles.navBtn, ...styles.navNext }}
                        >
                            ›
                        </button>
                        <div style={styles.dots} aria-hidden="true">
                            {images.map((_, i) => (
                                <span
                                    key={i}
                                    style={{ ...styles.dot, ...(i === index ? styles.dotActive : {}) }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div style={styles.body}>
                <div style={styles.row}>
                    <h3 style={styles.title} title={title}>
                        {title}
                    </h3>
                    {typeof rating === "number" && (
                        <div style={styles.rating} aria-label={`Rated ${rating} out of 5`}>
                            <span aria-hidden="true" style={{ color: "#111827" }}>
                                {star}
                            </span>
                            <span>{rating.toFixed(2).replace(/\.00$/, "")}</span>
                            {typeof reviewCount === "number" && <span>({reviewCount})</span>}
                        </div>
                    )}
                </div>

                {locationText && (
                    <div style={styles.location} title={locationText}>
                        {locationText}
                    </div>
                )}

                <div style={styles.priceRow}>
                    <span style={{ ...styles.price, ...styles.bold }}>{priceText}</span>
                    <span style={styles.price}>night</span>
                </div>
            </div>

            {footer ? <div style={styles.footer}>{footer}</div> : null}
        </div>
    );
});

export function CardSkeleton({ className }: { className?: string }) {
    return (
        <div className={className} style={styles.card} aria-hidden="true">
            <div style={styles.imageWrap}>
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 37%,#f3f4f6 63%)",
                        backgroundSize: "400% 100%",
                        animation: "card-skel 1.4s ease infinite",
                    }}
                />
            </div>
            <div style={styles.body}>
                <div
                    style={{
                        height: 18,
                        width: "70%",
                        borderRadius: 6,
                        background: "#e5e7eb",
                    }}
                />
                <div
                    style={{
                        height: 14,
                        width: "50%",
                        borderRadius: 6,
                        background: "#e5e7eb",
                    }}
                />
                <div
                    style={{
                        height: 16,
                        width: "40%",
                        borderRadius: 6,
                        background: "#e5e7eb",
                    }}
                />
            </div>
            <style>{`
                @keyframes card-skel {
                    0% { background-position: 100% 0 }
                    100% { background-position: 0 0 }
                }
            `}</style>
        </div>
    );
}

export default Card;