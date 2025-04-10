// src/pages/CostumeDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CostumeDetail({ costumeId }) {
  const [costume, setCostume] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [rentalId, setRentalId] = useState(null);

  useEffect(() => {
    const fetchCostume = async () => {
      try {
        const costumeResponse = await axios.get(`http://localhost:3000/api/costumes/${costumeId}`);
        setCostume(costumeResponse.data);

        const feedbackResponse = await axios.get(
          `http://localhost:3000/api/rentals/feedback/costume/${costumeId}`
        );
        setFeedbacks(feedbackResponse.data);

        // Tìm rental của user để feedback
        const rentals = await axios.get(
          `http://localhost:3000/api/carts/${localStorage.getItem('userId')}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        const userRental = rentals.data.find((r) =>
          r.items.some((i) => i.costumeID._id === costumeId)
        );
        if (userRental) {
          setRentalId(userRental._id);
          const itemFeedback = userRental.items.find((i) => i.costumeID._id === costumeId).feedback;
          if (itemFeedback) {
            setRating(itemFeedback.rating);
            setComment(itemFeedback.comment);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCostume();
  }, [costumeId]);

  const handleSubmitFeedback = async () => {
    if (!rentalId) {
      alert('Bạn chưa thuê costume này!');
      return;
    }
    try {
      const payload = {
        rentalId,
        costumeId,
        rating,
        comment,
        customerId: localStorage.getItem('userId'),
      };
      await axios.post('http://localhost:3000/api/rentals/feedback', payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Đã gửi/cập nhật feedback!');
      window.location.reload(); // Tạm thời reload
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra!');
    }
  };

  if (!costume) return <div>Đang tải...</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold">{costume.name}</h1>
      <img src={costume.images[0]} alt={costume.name} className="w-48 h-48 object-cover" />
      <p>Giá: {costume.pricePerDay.toLocaleString()} VNĐ/ngày</p>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">Đánh giá</h2>
        {feedbacks.length === 0 ? (
          <p>Chưa có đánh giá</p>
        ) : (
          <ul>
            {feedbacks.map((fb, index) => (
              <li key={index}>
                {fb.customer} - Ngày thuê: {new Date(fb.rentalDate).toLocaleDateString()} -{' '}
                {fb.rating} sao - {fb.comment}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h3>Để lại đánh giá</h3>
        <div>
          <label>Điểm (1-5): </label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>Bình luận: </label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSubmitFeedback}
        >
          Gửi/Cập nhật
        </button>
      </div>
    </div>
  );
}

export default CostumeDetail;