import React, { useState, useRef } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { Box, Typography, useTheme } from "@mui/material";

const ProfileCompletenessPie = ({ data }) => {
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const theme = useTheme();

  const pieRef = useRef(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const calculateTooltipPosition = (index) => {
    if (!pieRef.current) return;

    const rect = pieRef.current.getBoundingClientRect();

    const totalValue = data.reduce((sum, d) => sum + d.value, 0);
    const percentage = data[index].value / totalValue;

    // midpoint angle of slice
    let startAngle = -90;
    for (let i = 0; i < index; i++) {
      startAngle += (data[i].value / totalValue) * 360;
    }
    const midAngle = startAngle + percentage * 360 / 2;

    const radius = rect.width / 2;

    const rad = (midAngle * Math.PI) / 180;

    const centerX = rect.left + radius;
    const centerY = rect.top + radius;

    const tooltipX = centerX + (radius * 0.55) * Math.cos(rad);
    const tooltipY = centerY + (radius * 0.55) * Math.sin(rad);

    return { x: tooltipX, y: tooltipY };
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Box sx={{ position: "relative" }}>
        <div ref={pieRef}>
          <PieChart
            data={data}
            lineWidth={60}
            radius={40}
            startAngle={-90}
            animate
            animationDuration={900}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
            labelStyle={{ fontSize: "5px", fill: "#fff", fontWeight: "bold" }}
            labelPosition={70}
            segmentsShift={(index) => (index === hovered ? 5 : 0)}
            segmentsStyle={(index) => ({
              transition: "all 300ms ease",
              cursor: "pointer",
              filter: index === hovered ? "brightness(1.2)" : "none",
            })}
            onMouseOver={(e, index) => {
              setHovered(index);
              const pos = calculateTooltipPosition(index);
              setTooltip({
                ...pos,
                title: data[index].title,
                value: data[index].value,
              });
            }}
            onMouseOut={() => {
              setHovered(null);
              setTooltip(null);
            }}
          />
        </div>

        {tooltip && (
          <Box
            sx={{
              position: "fixed",
              top: tooltip.y - 20,
              left: tooltip.x + 10,
              background: "#333",
              color: "#fff",
              px: 2,
              py: 0.5,
              borderRadius: "6px",
              fontSize: "12px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 9999,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div>{tooltip.title}</div>
            <div>{tooltip.value}%</div>
          </Box>
        )}

        <Typography sx={{mt:'-30px', ...theme.typography.h3,textAlign:'center'}}>
          {total}% Complete
        </Typography>
      </Box>

      <Box>
        {data.map((item, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "2px",
                backgroundColor: item.color,
                mr: 1.2,
              }}
            />
            <Typography sx={{ fontSize: "14px" }}>{item.title}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProfileCompletenessPie;
