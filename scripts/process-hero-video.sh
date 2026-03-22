#!/usr/bin/env bash
# Process hero video from raw footage in _intake/video/
# Usage: bash scripts/process-hero-video.sh
#
# Source: DJI underwater footage (portrait 3840x2160, rotation -90)
# Output: Landscape 1920x1080 hero video with crossfade transitions
#
# Requires: ffmpeg (brew install ffmpeg)

set -euo pipefail

INTAKE_DIR="_intake/video"
OUT_DIR="public/videos"
TMP_DIR="/tmp/aveyla-hero-build"

mkdir -p "$OUT_DIR" "$TMP_DIR"

echo "=== Trimming best segments ==="
# Each segment: rotate portrait→landscape, crop center 16:9, scale to 1080p
FILTER="transpose=2,crop=ih*16/9:ih:(iw-ih*16/9)/2:0,scale=1920:1080"

ffmpeg -y -ss 3 -t 5 -i "$INTAKE_DIR/dji_mimo_20260322_153100_20260322153101_1774183409052_video.MP4" -vf "$FILTER" -an -c:v libx264 -preset fast -crf 23 "$TMP_DIR/seg1.mp4"
ffmpeg -y -ss 3 -t 5 -i "$INTAKE_DIR/dji_mimo_20260322_153834_20260322153835_1774183394962_video.MP4" -vf "$FILTER" -an -c:v libx264 -preset fast -crf 23 "$TMP_DIR/seg2.mp4"
ffmpeg -y -ss 5 -t 5 -i "$INTAKE_DIR/dji_mimo_20260322_153500_20260322153500_1774183405548_video.MP4" -vf "$FILTER" -an -c:v libx264 -preset fast -crf 23 "$TMP_DIR/seg3.mp4"
ffmpeg -y -ss 12 -t 5 -i "$INTAKE_DIR/dji_mimo_20260322_154918_20260322154919_1774183392413_video.MP4" -vf "$FILTER" -an -c:v libx264 -preset fast -crf 23 "$TMP_DIR/seg4.mp4"
ffmpeg -y -ss 12 -t 5 -i "$INTAKE_DIR/dji_mimo_20260322_155202_20260322155203_1774183390230_video.MP4" -vf "$FILTER" -an -c:v libx264 -preset fast -crf 23 "$TMP_DIR/seg5.mp4"
ffmpeg -y -ss 3 -t 5 -i "$INTAKE_DIR/dji_mimo_20260322_155348_20260322155348_1774183378318_video.MP4" -vf "$FILTER" -an -c:v libx264 -preset fast -crf 23 "$TMP_DIR/seg6.mp4"

echo "=== Concatenating with crossfades ==="
ffmpeg -y \
  -i "$TMP_DIR/seg1.mp4" -i "$TMP_DIR/seg2.mp4" -i "$TMP_DIR/seg4.mp4" \
  -i "$TMP_DIR/seg5.mp4" -i "$TMP_DIR/seg3.mp4" -i "$TMP_DIR/seg6.mp4" \
  -filter_complex " \
    [0:v]settb=AVTB,fps=30[v0]; \
    [1:v]settb=AVTB,fps=30[v1]; \
    [2:v]settb=AVTB,fps=30[v2]; \
    [3:v]settb=AVTB,fps=30[v3]; \
    [4:v]settb=AVTB,fps=30[v4]; \
    [5:v]settb=AVTB,fps=30[v5]; \
    [v0][v1]xfade=transition=fade:duration=0.5:offset=4.5[x01]; \
    [x01][v2]xfade=transition=fade:duration=0.5:offset=9[x02]; \
    [x02][v3]xfade=transition=fade:duration=0.5:offset=13.5[x03]; \
    [x03][v4]xfade=transition=fade:duration=0.5:offset=18[x04]; \
    [x04][v5]xfade=transition=fade:duration=0.5:offset=22.5[out] \
  " \
  -map "[out]" -c:v libx264 -preset slow -crf 32 -pix_fmt yuv420p \
  -an -movflags +faststart \
  "$OUT_DIR/hero.mp4"

echo "=== Encoding WebM ==="
ffmpeg -y -i "$OUT_DIR/hero.mp4" \
  -c:v libvpx-vp9 -crf 40 -b:v 0 -an -pix_fmt yuv420p \
  "$OUT_DIR/hero.webm"

echo "=== Generating poster ==="
ffmpeg -y -ss 12 -i "$OUT_DIR/hero.mp4" -frames:v 1 -q:v 2 \
  public/images/hero-poster.jpg

echo "=== Cleaning up ==="
rm -rf "$TMP_DIR"

echo "=== Done ==="
ls -lh "$OUT_DIR/hero.mp4" "$OUT_DIR/hero.webm" public/images/hero-poster.jpg
