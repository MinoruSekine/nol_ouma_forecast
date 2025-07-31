OUT_DIR := out
OUT_PNG_FILES := $(OUT_DIR)/usecase.png

all: png

clean:
	rm $(OUT_PNG_FILES)
	rm -rf $(OUT_DIR)

png: $(OUT_PNG_FILES)

$(OUT_DIR)/%.png: %.pu
	plantuml -o $(OUT_DIR) $<

.PHONY: all clean png
