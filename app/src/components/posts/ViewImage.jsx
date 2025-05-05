import React, { useCallback, useEffect, useState } from "react";
import CustomAxios from "../../utils/axios";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ViewImage = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state) => state.auth);
  const { _id } = useParams();
  const viewImageData = useCallback(async () => {
    try {
      const imageData = await CustomAxios.get(`/post/viewImage/${_id}`);
      if (imageData) {
        console.log(imageData);
        setPost(imageData);
        toast.success("image loaded successfully.")
      } else {
        console.log("image not found");
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    if (loggedIn === null) return;
    if (!loggedIn) navigate("/login");
  }, [loggedIn]);

  useEffect(() => {
    viewImageData();
  }, []);

  return (
    <>
      {post ? (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "32px",
          padding: "32px",
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#fafafa",
          minHeight: "100vh"
        }}>
          {/* Image Container */}
          <div style={{
            flex: "1",
            maxWidth: "800px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            aspectRatio: "1/1",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}>
            <img
              src={post.data.image}
              alt="Post"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.3s ease",
                cursor: "zoom-in"
              }}
            />
            <div style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <div style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 100%)"
              }} />
              <span>{post.data.username || "Unknown"}</span>
            </div>
          </div>
  
          {/* Info Container */}
          <div style={{
            flex: "0 0 360px",
            padding: "24px 0",
            position: "sticky",
            top: "32px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px"
              }}>
                {post.data.username ? post.data.username.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <div style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#333"
                }}>{post.data.username || "Unknown User"}</div>
                <div style={{
                  fontSize: "14px",
                  color: "#999"
                }}>{post.data.createdAt}</div>
              </div>
            </div>
  
            <h1 style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "16px",
              color: "#222",
              lineHeight: "1.3"
            }}>
              {post.data.title}
            </h1>
  
            <p style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#555",
              marginBottom: "24px",
              paddingBottom: "24px",
              borderBottom: "1px solid #eee"
            }}>
              {post.data.description}
            </p>
  
            <div style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap"
            }}>
              {post.data.tags?.map(tag => (
                <span key={tag} style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  backgroundColor: "#f3f3f3",
                  color: "#555",
                  fontSize: "14px"
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#fff" }}>
          Loading...
        </p>
      )}
    </>
  );
}
export default ViewImage;
