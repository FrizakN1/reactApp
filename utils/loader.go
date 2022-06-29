package utils

import "os"

func LoadFile(filename string) ([]byte, error) {
	file, e := os.Open(filename)
	if e != nil {
		return nil, e
	}

	defer file.Close()

	stat, e := file.Stat()
	if e != nil {
		return nil, e
	}

	_bytes := make([]byte, stat.Size())
	_, e = file.Read(_bytes)
	if e != nil {
		return nil, e
	}

	return _bytes, nil
}
